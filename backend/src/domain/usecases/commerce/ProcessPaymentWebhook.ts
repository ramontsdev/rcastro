import type { ParseWebhookInput } from '@/data/protocols/payment/PaymentGateway';

export interface IProcessPaymentWebhook {
  execute(input: ParseWebhookInput): Promise<void>
}
