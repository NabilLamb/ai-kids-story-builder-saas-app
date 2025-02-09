import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a matcher for protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/create-story(.*)']);

// Create a matcher for public routes (in this case, the sign-in and sign-up routes)
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
    // Check if the request is for a public route
    if (!isPublicRoute(req)) {
        // If it's not a public route, protect it
        if (isProtectedRoute(req)) {
            await auth.protect();
        }
    }
});

// Configuration for the matcher
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
