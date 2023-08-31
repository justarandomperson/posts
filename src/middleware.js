import { NextRequest, NextResponse } from "next/server"

/**
 * @param {NextRequest} req
 */

export function middleware(req) {
  const path = req.nextUrl.pathname
  const isAuthPath = path === "/login" || path === "/signup"
  const isPublicPath = path === "/"
  const token = req.cookies.get("token")
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  } else if (!isAuthPath && !isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
}
