import { randomUUID } from 'node:crypto';

import type { NextFunction, Request, Response } from 'express';

export function requestIdMiddleware(request: Request, response: Response, next: NextFunction) {
  const incoming = request.header('x-request-id');
  const requestId = incoming && incoming.trim().length > 0 ? incoming : randomUUID();

  response.setHeader('X-Request-Id', requestId);

  request.metadata = {
    ...request.metadata,
    requestId,
  };

  next();
}

