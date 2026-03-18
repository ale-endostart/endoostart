import { withAuth } from 'next-auth/middleware'
// removed import

export default withAuth(
  function middleware() {
    // Middleware logic can go here if needed
    return null
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect /dashboard and /admin routes
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN'
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/signin'],
}
