import { makeJwtAdapter } from '@/main/factories/adapters/jwtAdapterFactory';
import { makeFindUserByIdUsecase } from '@/main/factories/usecases/user/findUserByIdUsecaseFactory';
import { OptionalAuthenticationMiddleware } from '@/presentation/middlewares/OptionalAuthenticationMiddleware';

export function makeOptionalAuthenticationMiddleware() {
  return new OptionalAuthenticationMiddleware(
    makeFindUserByIdUsecase(),
    makeJwtAdapter(),
  );
}

