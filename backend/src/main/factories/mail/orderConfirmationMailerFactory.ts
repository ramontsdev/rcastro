import type {
  IOrderConfirmationMailer,
  OrderPaidEmailPayload,
} from '@/domain/usecases/commerce/OrderConfirmationMail';
import { env } from '@/main/config/env';
import { makeSESGatewayAdapter } from '@/main/factories/adapters/sesGatewayAdapterFactory';
import { buildOrderPaidConfirmationEmailTemplate } from '@/presentation/helpers/emailTemplates/orderPaidConfirmationEmailTemplate';

export function makeOrderConfirmationMailer(): IOrderConfirmationMailer {
  const gateway = makeSESGatewayAdapter();

  return {
    async sendPaidOrderConfirmation(payload: OrderPaidEmailPayload): Promise<void> {
      await gateway.sendEmail({
        from: `${env.app.name}<${env.app.email}>`,
        to: [payload.customerEmail],
        subject: `Pedido confirmado — ${env.app.name}`,
        html: buildOrderPaidConfirmationEmailTemplate(payload),
      });
    },
  };
}
