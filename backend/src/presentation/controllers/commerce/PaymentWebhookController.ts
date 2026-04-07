import type { IProcessPaymentWebhook } from '@/domain/usecases/commerce/ProcessPaymentWebhook';
import { badRequest, ok, serverError } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http';

export class PaymentWebhookController implements IController {
  constructor(private readonly processPaymentWebhook: IProcessPaymentWebhook) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const body = httpRequest.body;

    if (typeof body !== 'string' && !(body instanceof Uint8Array)) {
      return badRequest({ error: 'Corpo inválido para webhook' });
    }

    try {
      await this.processPaymentWebhook.execute({
        rawBody: body,
        headers: httpRequest.headers,
      });

      return ok({ received: true });
    } catch {
      return serverError('Falha ao processar webhook');
    }
  }
}
