import type { ICreateCheckoutSession } from '@/domain/usecases/commerce/CreateCheckoutSession';
import { badRequest, created, serverError } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http';
import { createCheckoutSchema } from '@/presentation/validations/commerce/createCheckoutSchema';

export class CreateCheckoutController implements IController {
  constructor(private readonly createCheckoutSession: ICreateCheckoutSession) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { success, data, error } = createCheckoutSchema.safeParse(httpRequest.body);

    if (!success) {
      return badRequest(
        error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      );
    }

    try {
      const result = await this.createCheckoutSession.execute({
        ...data,
        userId: httpRequest.account?.userId,
      });

      return created(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar sessão de pagamento.';

      if (message.includes('Gateway não retornou') || message.includes('Stripe')) {
        return serverError(message);
      }

      return badRequest({ error: message });
    }
  }
}
