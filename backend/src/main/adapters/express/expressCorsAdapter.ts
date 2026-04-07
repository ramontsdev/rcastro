import { NextFunction, Request, Response } from 'express';

import { env } from '@/main/config/env';

function parseAllowedOrigins(raw: string): string[] {
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

export function expressCors(request: Request, response: Response, next: NextFunction) {
  const allowedOrigins = parseAllowedOrigins(env.allowedOrigins ?? '');
  const origin = request.header('origin');
  const isAllowed = Boolean(origin && allowedOrigins.includes(origin));

  if (isAllowed && origin) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.setHeader('Access-Control-Max-Age', '600');
  }

  if (request.method === 'OPTIONS') {
    response.status(204).end();

    return;
  }

  next();
}
