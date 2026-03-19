import { httpRouter } from 'convex/server';

import { auth } from './auth';

const http = httpRouter();

/**
 * Register Convex Auth HTTP routes.
 * Handles OAuth callbacks and email verification flows.
 */
auth.addHttpRoutes(http);

export default http;
