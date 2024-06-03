import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/api/webhooks/clerk',
  // '/api/webhooks/stripe',
]);

export default clerkMiddleware((auth, req) => {
  // Protect all routes except the ones defined as public
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next|favicon.ico).*)', '/', '/(api|trpc)(.*)',
  ],
};
