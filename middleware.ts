// frontend/middleware.ts

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 1. Define Public Routes using createRouteMatcher
// This includes the sign-in/sign-up pages, the landing page, and marketing links.
const isPublicRoute = createRouteMatcher([
    '/', // Landing page
    '/products', // Marketing page
    '/pricing', // Marketing page
    '/api/universities', // Public API endpoint for preview
    '/sign-in(.*)', // Matches /sign-in and /sign-in/anything
    '/sign-up(.*)', // Matches /sign-up and /sign-up/anything
]);

// 2. Define Protected Routes Logic
export default clerkMiddleware(async (auth, req) => {
    // If the route is NOT a public route, run auth.protect()
    // auth.protect() automatically redirects unauthenticated users to CLERK_SIGN_IN_URL
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

// 3. Matcher Configuration (Your existing config)
export const config = {
    matcher: [
        // Ensure middleware runs for all necessary application routes and APIs
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};