import { NextRequest, NextResponse } from "next/server";
import { accessControl } from "./app/helpers/accessControl";
import { routes } from "./app/routes";
import { jwtVerify } from "jose";
import { IAuthMeUser } from "./interfaces";

// Verifica y decodifica el token JWT
async function verifyToken(token: string): Promise<IAuthMeUser | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as IAuthMeUser;
  } catch (error) {
    console.error("🔐 Error al verificar token:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  const isPublic = accessControl.publicRoutes.some((r) =>
    pathname.startsWith(r)
  );

  if (!token) {
    return isPublic
      ? NextResponse.next()
      : NextResponse.redirect(new URL(routes.public.login, req.url));
  }

  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL(routes.public.login, req.url));
  }

  if (isPublic) {
    return NextResponse.redirect(new URL(routes.user.profile, req.url));
  }

  if (!accessControl.canAccessPath(user, pathname)) {
    const fallback =
      user.roles?.length === 0
        ? routes.client.subscription
        : routes.user.profile;

    return NextResponse.redirect(new URL(fallback, req.url));
  }

  return NextResponse.next();
}

// Ignora assets estáticos y APIs
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets|public).*)"],
};
