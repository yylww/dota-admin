import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import createMiddleware from 'next-intl/middleware'
// import { locales, defaultLocale, localePrefix } from "./app/messages/config"
import { locales, localePrefix } from './app/messages/navigation'

const intlMiddleware = createMiddleware({
  defaultLocale: 'zh',
  localePrefix,
  locales,
})

const { auth } = NextAuth(authConfig)

const authMiddleware = auth((req) => {
  const isLoginPage = req.nextUrl.pathname.startsWith('/login')
  const session = req.auth

  // Redirect to sign-in page if not authenticated
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  // Redirect to home page if authenticated and trying to access auth pages
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }
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
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}

export default middleware