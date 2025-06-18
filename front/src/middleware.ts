// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("access_token")?.value;
//   const pathname = request.nextUrl.pathname;

//   const isClient = pathname.startsWith("/client");
//   const isEmployee = pathname.startsWith("/admin");

//   const role = request.cookies.get("role")?.value; // debes setearla en el login

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Ejemplo de control por rol:
//   if (isEmployee && !["superadmin", "company", "vendedor"].includes(role)) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   }

//   if (isClient && role !== "cliente") {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*", "/client/:path*"],
// };
