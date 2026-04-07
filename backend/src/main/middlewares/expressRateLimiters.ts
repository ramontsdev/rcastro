import { rateLimit } from 'express-rate-limit';

const tooManyMsg = {
  error: 'Muitas requisições a partir deste endereço. Aguarde e tente novamente.',
};

const base = {
  standardHeaders: true,
  legacyHeaders: false,
  message: tooManyMsg,
} as const;

/**
 * Login — limite mais baixo (tentativa de força bruta / stuffing).
 * 15 tentativas / 15 min por IP.
 */
export const authSignInRateLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 15,
});

/**
 * Cadastro — reduz spam de contas. 10 / hora por IP.
 */
export const authSignUpRateLimiter = rateLimit({
  ...base,
  windowMs: 60 * 60 * 1000,
  limit: 10,
});

/**
 * Esqueci senha e reenvio de verificação — limita disparo de e-mail. 8 / hora por IP.
 */
export const authPasswordOrVerificationEmailRateLimiter = rateLimit({
  ...base,
  windowMs: 60 * 60 * 1000,
  limit: 8,
});

/**
 * Confirmar e-mail e redefinir senha (código no corpo). 40 / 15 min por IP.
 */
export const authTokenBodyRateLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 40,
});

/**
 * Sessão de checkout (cria pedido + Payment). 40 / 15 min por IP.
 */
export const checkoutSessionRateLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 40,
});

/**
 * GET /me autenticado. 200 / 15 min por IP (token JWT já restringe identidade).
 */
export const authenticatedReadRateLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 200,
});

/**
 * Catálogo público (vitrine). 600 / 15 min por IP.
 */
export const publicCatalogReadRateLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 600,
});
