import { NextFunction, Request, Response } from 'express';

import { IController } from '@/presentation/protocols/controller';
import { HttpRequest } from '@/presentation/protocols/http';

function toHeaderMap(headers: Request['headers']): Record<string, string> {
  const out: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers)) {
    if (value === undefined) continue;
    out[String(key).toLowerCase()] = Array.isArray(value) ? value.join(',') : String(value);
  }

  return out;
}

export function adaptExpressRoute(controller: IController) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const httpRequest: HttpRequest = {
        body: request.body,
        headers: toHeaderMap(request.headers),
        query: request.query as Record<string, string>,
        params: request.params as Record<string, string>,
        account: request.metadata?.account,
      };

      const httpResponse = await controller.handle(httpRequest);

      response.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      next(error);
    }
  };
}

export function adaptExpressWebhookRoute(controller: IController) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const httpRequest: HttpRequest = {
        body: request.body,
        headers: toHeaderMap(request.headers),
        query: request.query as Record<string, string>,
        params: request.params as Record<string, string>,
      };

      const httpResponse = await controller.handle(httpRequest);

      response.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      next(error);
    }
  };
}
