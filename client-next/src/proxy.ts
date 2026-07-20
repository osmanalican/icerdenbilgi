import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("session");

  if (session) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/giris", request.url);

  loginUrl.searchParams.set(
    "redirect",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/paylas/:path*"],
};
