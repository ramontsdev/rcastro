import type { IPaymentGateway, ParseWebhookInput } from '@/data/protocols/payment/PaymentGateway';
import type { ICommerceRepository } from '@/data/protocols/repositories/commerce/ICommerceRepository';
import type { IOrderConfirmationMailer } from '@/domain/usecases/commerce/OrderConfirmationMail';
import type { IProcessPaymentWebhook } from '@/domain/usecases/commerce/ProcessPaymentWebhook';

export class ProcessPaymentWebhookUsecase implements IProcessPaymentWebhook {
  constructor(
    private readonly commerce: ICommerceRepository,
    private readonly paymentGateway: IPaymentGateway,
    private readonly orderConfirmationMailer: IOrderConfirmationMailer,
  ) {}

  async execute(input: ParseWebhookInput): Promise<void> {
    const events = await this.paymentGateway.parseWebhook(input);

    for (const event of events) {
      if (!event.rawProviderEventId) {
        continue;
      }

      const consumed = await this.commerce.tryConsumeWebhookEvent(
        event.rawProviderEventId,
        event.provider,
      );

      if (!consumed) {
        continue;
      }

      if (event.type === 'payment.succeeded') {
        const paid = await this.commerce.applyCheckoutSessionPaid(event.providerPaymentId);

        if (paid) {
          try {
            await this.orderConfirmationMailer.sendPaidOrderConfirmation(paid);
          } catch (err) {
            console.error('[commerce] Falha ao enviar e-mail de pedido confirmado:', err);
          }
        }
      }

      if (event.type === 'payment.failed') {
        await this.commerce.applyCheckoutSessionFailed(event.providerPaymentId);
      }
    }
  }
}
