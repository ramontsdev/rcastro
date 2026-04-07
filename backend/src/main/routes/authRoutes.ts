import { Router } from 'express';

import { adaptExpressRoute } from '@/main/adapters/express/expressRouteAdapter';
import { makeConfirmEmailController } from '@/main/factories/controllers/authentication/confirmEmailControllerFactory';
import { makeForgotPasswordController } from '@/main/factories/controllers/authentication/forgotPasswordControllerFactory';
import { makeResendVerificationCodeController } from '@/main/factories/controllers/authentication/resendVerificationCodeControllerFactory';
import { makeResetPasswordController } from '@/main/factories/controllers/authentication/resetPasswordControllerFactory';
import { makeSignInController } from '@/main/factories/controllers/authentication/signInControllerFactory';
import { makeSignUpController } from '@/main/factories/controllers/authentication/signUpControllerFactory';
import {
  authPasswordOrVerificationEmailRateLimiter,
  authSignInRateLimiter,
  authSignUpRateLimiter,
  authTokenBodyRateLimiter,
} from '@/main/middlewares/expressRateLimiters';

export const authRoutes = Router();

authRoutes.post('/sign-in', authSignInRateLimiter, adaptExpressRoute(makeSignInController()));
authRoutes.post('/sign-up', authSignUpRateLimiter, adaptExpressRoute(makeSignUpController()));
authRoutes.post('/confirm-email', authTokenBodyRateLimiter, adaptExpressRoute(makeConfirmEmailController()));
authRoutes.post(
  '/forgot-password',
  authPasswordOrVerificationEmailRateLimiter,
  adaptExpressRoute(makeForgotPasswordController()),
);
authRoutes.post('/reset-password', authTokenBodyRateLimiter, adaptExpressRoute(makeResetPasswordController()));
authRoutes.post(
  '/resend-verification-code',
  authPasswordOrVerificationEmailRateLimiter,
  adaptExpressRoute(makeResendVerificationCodeController()),
);
