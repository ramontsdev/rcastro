import express, { NextFunction, Request, Response } from 'express';

import { expressCors } from '@/main/adapters/express/expressCorsAdapter';
import { expressHelmet } from '@/main/adapters/express/expressHelmetAdapter';
import { adaptExpressWebhookRoute } from '@/main/adapters/express/expressRouteAdapter';
import { makePaymentWebhookController } from '@/main/factories/controllers/commerce/paymentWebhookControllerFactory';
import { requestIdMiddleware } from '@/main/middlewares/requestIdMiddleware';

import { env } from './config/env';
import { authRoutes } from './routes/authRoutes';
import { commerceRoutes } from './routes/commerceRoutes';
import { userRoutes } from './routes/userRoutes';

const app = express();

if (env.trustProxy) {
  app.set('trust proxy', 1);
}

app.use(expressHelmet);
app.use(requestIdMiddleware);
app.use(expressCors);

app.post(
  '/api/webhooks/payment',
  express.raw({ type: 'application/json' }),
  (request, response, next) => {
    adaptExpressWebhookRoute(makePaymentWebhookController())(request, response, next).catch(next);
  },
);

app.use(express.json());

app.get('/health', (_request: Request, response: Response) => {
  response.status(200).json({ status: 'OK' });
});

app.use('/api', [authRoutes, userRoutes, commerceRoutes]);

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error('--------------------------------------');
  console.error(error.message);
  console.error('--------------------------------------');
  response.status(500).json({ error: 'Internal Server Error' });
});

app.listen(env.port, () => {
  console.info(`Server is running on port ${env.port}`);
});

export { app };
