import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = ['/dashboard', '/my-cows']
  const adminPaths = ['/admin', '/api/admin'] 
  
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  const isAdminPath = adminPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // If the user is not logged in and trying to access a protected route
  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // For admin paths, check if user has admin role
  if (isAdminPath) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    // Check if user has admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Redirect to appropriate dashboard based on user role
  if (session && (request.nextUrl.pathname === '/auth' || request.nextUrl.pathname === '/dashboard')) {
    // Check if user has admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } else if (request.nextUrl.pathname === '/auth') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/my-cows/:path*',
    '/auth/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/dashboard'
  ]
}
