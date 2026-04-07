import { Router } from 'express';

import { adaptExpressMiddleware } from '@/main/adapters/express/expressMiddlewareAdapter';
import { adaptExpressRoute } from '@/main/adapters/express/expressRouteAdapter';
import { makeCreateCheckoutController } from '@/main/factories/controllers/commerce/createCheckoutControllerFactory';
import { makeGetProductBySlugController } from '@/main/factories/controllers/commerce/getProductBySlugControllerFactory';
import { makeListProductsController } from '@/main/factories/controllers/commerce/listProductsControllerFactory';
import { makeOptionalAuthenticationMiddleware } from '@/main/factories/middlewares/optionalAuthenticationMiddlewareFactory';
import { checkoutSessionRateLimiter } from '@/main/middlewares/expressRateLimiters';
import { publicCatalogReadRateLimiter } from '@/main/middlewares/expressRateLimiters';

export const commerceRoutes = Router();

commerceRoutes.get('/products', publicCatalogReadRateLimiter, adaptExpressRoute(makeListProductsController()));
commerceRoutes.get('/products/:slug', publicCatalogReadRateLimiter, adaptExpressRoute(makeGetProductBySlugController()));

/** Instancia o controller por requisição para permitir arranque do servidor sem secrets de pagamento. */
commerceRoutes.post(
  '/checkout/session',
  checkoutSessionRateLimiter,
  adaptExpressMiddleware(makeOptionalAuthenticationMiddleware()),
  (request, response, next) => {
    adaptExpressRoute(makeCreateCheckoutController())(request, response, next).catch(next);
  },
);
