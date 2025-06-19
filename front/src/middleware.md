// import { routes } from "./app/routes";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const SECRET = new TextEncoder().encode(
//   process.env.JWT_SECRET || "jwtsecurity"
// );

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("access_token")?.value;
//   const pathname = request.nextUrl.pathname;

//   if (!token) {
//     return NextResponse.redirect(new URL(routes.login, request.url));
//   }

//   try {
//     const { payload } = await jwtVerify(token, SECRET);

//     const type = payload.type; // "employee" | "client"
//     const roles = payload.roles || [];

//     const isClientRoute = pathname.startsWith("/client");
//     const isAdminRoute = pathname.startsWith("/admin");

//     // ✅ PROTECCIÓN SEGÚN TIPO Y ROL
//   if (isClientRoute && type !== "client") {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }

//     if (isAdminRoute && type !== "employee") {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }

//       // Solo permitir si tiene rol válido
//       if (isAdminRoute) {
//       const allowed = ["SUPERADMIN", "COMPANY", "VENDEDOR"];
//       if (!Array.isArray(roles) || !roles.some((r: string) => allowed.includes(r))) {
//         return NextResponse.redirect(new URL("/unauthorized", request.url));
//       }
//     }

//     return NextResponse.next();
//   } catch (err) {
//     console.error("Error verificando JWT", err);
//     return NextResponse.redirect(new URL(routes.login, request.url));
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*", "/client/:path*"],
// };
