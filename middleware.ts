import { authMiddleware } from '@clerk/nextjs';
import { protectMiddleware } from './helpers/protect';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ['/', '/sign-up', '/sign-in'],
  beforeAuth: protectMiddleware,
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
