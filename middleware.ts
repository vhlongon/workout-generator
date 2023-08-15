import { authMiddleware } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { isValidProtectPasswordInCookies } from './helpers/protect';

export const publicRoutes = ['/', '/sign-up', '/sign-in', '/home'];
export const protectMiddleware = async (req: NextRequest) => {
  const isAuthorized = isValidProtectPasswordInCookies();
  const pathname = req.nextUrl.pathname;
  const isRoot = pathname === '/';

  if (isRoot) {
    return NextResponse.next();
  }

  if (!isAuthorized) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes,
  beforeAuth: protectMiddleware,
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
