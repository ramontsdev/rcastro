import { IDecrypter } from '@/domain/cryptography/decrypter';
import { IFindUserById } from '@/domain/usecases/user/FindUserById';
import { ok } from '@/presentation/helpers/httpHelpers';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http';
import { IMiddleware } from '@/presentation/protocols/middleware';

/**
 * Autenticação opcional: se houver Bearer token válido, preenche `account`.
 * Se não houver token ou estiver inválido, segue como convidado.
 */
export class OptionalAuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly findUserById: IFindUserById,
    private readonly decrypter: IDecrypter,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { authorization } = httpRequest.headers;

    if (!authorization) {
      return ok({});
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return ok({});
    }

    try {
      const payload = await this.decrypter.decrypt(token) as { sub: string } | null;

      if (!payload?.sub) {
        return ok({});
      }

      const user = await this.findUserById.findById(payload.sub);

      if (!user) {
        return ok({});
      }

      return ok({
        account: {
          userId: user.id,
        },
      });
    } catch {
      return ok({});
    }
  }
}

