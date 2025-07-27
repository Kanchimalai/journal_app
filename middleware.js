// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Public paths that do not require authentication
  const publicPaths = ['/', '/login', '/register'];

  // If the path is public, let the request through
  if (publicPaths.includes(pathname)) {
    // If user is logged in and tries to access login/register, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } catch (err) {
        // Invalid token, allow access to login/register
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // For all other paths, check for a valid token
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    // Token is invalid, redirect to login and clear the bad token
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  // Match all paths except for API routes, static files, and images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|HomePage.module.css).*)'],
};