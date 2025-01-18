import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard', '/profile']

export default async function middleware(req: NextRequest) {
  const redirectUrl = req.nextUrl.clone()
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)


  if (isProtectedRoute || path === '/auth') {
    const authToken = (await cookies()).get('payload-token')?.value

    if (authToken) {
      if (path === '/profile') {
        return NextResponse.next()
      }

      if (path === '/login') {
        redirectUrl.pathname = '/profile'
      }

      return NextResponse.redirect(redirectUrl)
    }

    // user unauthenticated
    if (path !== '/login') {// prevent redirect loop
      redirectUrl.pathname = '/login'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
