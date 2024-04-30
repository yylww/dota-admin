import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale, localePrefix } from "./app/messages/config"

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  localePrefix,
})

const { auth } = NextAuth(authConfig)

const authMiddleware = auth((req) => {
  const isAuthPage = req.nextUrl.pathname.startsWith('/login')
  const session = req.auth

  // Redirect to sign-in page if not authenticated
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  // Redirect to home page if authenticated and trying to access auth pages
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  return intlMiddleware(req)
})

const middleware = (req) => {
  const { pathname } = req.nextUrl
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/dashboard')
  if (isAuthPage) {
    return authMiddleware(req)
  } else {
    return intlMiddleware(req)
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/([\\w-]+)?/main/(.+)']
}

export default middleware