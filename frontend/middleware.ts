// frontend/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isApiPath = request.nextUrl.pathname.startsWith('/api');

  // If trying to access auth pages while logged in, redirect to home
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If accessing protected routes without token, redirect to login
  if (!token && !isAuthPage && !isApiPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/stories/:path*',
    '/auth/:path*',
  ]
};
