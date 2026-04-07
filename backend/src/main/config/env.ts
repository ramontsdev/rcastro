export const env = {
  // Server
  port: process.env.PORT as string,
  nodeVersion: process.env.NODE_VERSION as string,

  // Database
  databaseUrl: process.env.DATABASE_URL as string,

  // Authentication
  jwtSecret: process.env.JWT_SECRET as string,

  // App
  app: {
    name: process.env.APP_NAME as string,
    domain: process.env.APP_DOMAIN as string,
    email: process.env.APP_EMAIL as string,
  },

  // AWS
  aws: {
    region: process.env.AWS_REGION as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },

  // Email
  emailFrom: process.env.EMAIL_FROM as string,

  // Origins
  allowedOrigins: process.env.ALLOWED_ORIGINS as string,

  /** Com reverse proxy (nginx, load balancer), definir true para `req.ip` respeitar X-Forwarded-For (rate limit e IP corretos). */
  trustProxy: process.env.TRUST_PROXY === '1' || process.env.TRUST_PROXY === 'true',

  // Pagamentos (Stripe como 1ª implementação; ver docs/pagamentos-arquitetura-agnostica.md)
  payment: {
    provider: process.env.PAYMENT_PROVIDER ?? 'stripe',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    checkoutSuccessUrl: process.env.CHECKOUT_SUCCESS_URL ?? '',
    checkoutCancelUrl: process.env.CHECKOUT_CANCEL_URL ?? '',
  },
};
