import helmet from 'helmet';

/**
 * API JSON: sem CSP (útil sobretudo para HTML).
 * `crossOriginResourcePolicy: cross-origin` alinha com `fetch` do storefront noutro origin + CORS.
 */
export const expressHelmet = helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});
