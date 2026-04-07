import { Router } from 'express';

import { authenticatedReadRateLimiter } from '@/main/middlewares/expressRateLimiters';

import { adaptExpressMiddleware } from '../adapters/express/expressMiddlewareAdapter';
import { adaptExpressRoute } from '../adapters/express/expressRouteAdapter';
import { makeListMyOrdersController } from '../factories/controllers/commerce/listMyOrdersControllerFactory';
import { makeMeController } from '../factories/controllers/user/meControllerFactory';
import { makeAuthenticationMiddleware } from '../factories/middlewares/authenticationMiddlewareFactory';

export const userRoutes = Router();

userRoutes.get(
  '/me',
  authenticatedReadRateLimiter,
  adaptExpressMiddleware(makeAuthenticationMiddleware()),
  adaptExpressRoute(makeMeController()),
);

userRoutes.get(
  '/orders/me',
  authenticatedReadRateLimiter,
  adaptExpressMiddleware(makeAuthenticationMiddleware()),
  adaptExpressRoute(makeListMyOrdersController()),
);
