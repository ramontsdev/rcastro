import type { OrderPaidEmailPayload } from '@/domain/usecases/commerce/OrderConfirmationMail';
import { env } from '@/main/config/env';

import { emailColors } from './colors';

function formatBrl(cents: number, currency: string): string {
  const code = currency.toUpperCase() === 'BRL' ? 'BRL' : currency.toUpperCase();

  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: code });
}

export function buildOrderPaidConfirmationEmailTemplate(payload: OrderPaidEmailPayload): string {
  const greeting =
    payload.customerName?.trim() ? `Olá, ${payload.customerName.trim()}` : 'Olá';

  const rows = payload.items
    .map(
      i => `
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid ${emailColors.primary['200']}; color: ${emailColors.primary['800']}; font-size: 15px;">
              ${i.productName}
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid ${emailColors.primary['200']}; text-align: center; color: ${emailColors.primary['700']}; font-size: 14px;">
              ${i.quantity}
            </td>
            <td style="padding: 12px 8px; border-bottom: 1px solid ${emailColors.primary['200']}; text-align: right; color: ${emailColors.black}; font-size: 15px; font-weight: 500;">
              ${formatBrl(i.unitPriceCents * i.quantity, payload.currency)}
            </td>
          </tr>`,
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pedido confirmado — ${env.app.name}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${emailColors.primary['50']}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: ${emailColors.white}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, ${emailColors.success['600']} 0%, ${emailColors.success['800']} 100%); padding: 36px 28px; text-align: center;">
          <h1 style="color: ${emailColors.white}; margin: 0; font-size: 26px; font-weight: 600;">
            Pagamento confirmado
          </h1>
          <p style="color: ${emailColors.success['100']}; margin: 10px 0 0 0; font-size: 15px;">
            Recebemos o pagamento do seu pedido na ${env.app.name}.
          </p>
        </div>
        <div style="padding: 36px 28px;">
          <p style="color: ${emailColors.black}; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
            ${greeting},
          </p>
          <p style="color: ${emailColors.primary['800']}; line-height: 1.6; margin: 0 0 24px 0; font-size: 16px;">
            Obrigado pela compra. Em breve enviaremos atualizações sobre a preparação e o envio.
          </p>
          <p style="color: ${emailColors.primary['700']}; margin: 0 0 16px 0; font-size: 14px;">
            <strong>Nº do pedido:</strong>
            <span style="font-family: ui-monospace, monospace;">${payload.orderId}</span>
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            <thead>
              <tr style="background-color: ${emailColors.primary['50']};">
                <th style="text-align: left; padding: 10px 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: ${emailColors.primary['700']};">Item</th>
                <th style="text-align: center; padding: 10px 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: ${emailColors.primary['700']};">Qtd</th>
                <th style="text-align: right; padding: 10px 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: ${emailColors.primary['700']};">Subtotal</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div style="margin-top: 20px; padding-top: 16px; border-top: 2px solid ${emailColors.primary['200']};">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 15px; color: ${emailColors.primary['800']};">
              <span>Subtotal</span>
              <span>${formatBrl(payload.subtotalCents, payload.currency)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 15px; color: ${emailColors.primary['800']};">
              <span>Frete</span>
              <span>${payload.shippingCents === 0 ? 'Grátis' : formatBrl(payload.shippingCents, payload.currency)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 16px; font-size: 18px; font-weight: 700; color: ${emailColors.black};">
              <span>Total</span>
              <span>${formatBrl(payload.totalCents, payload.currency)}</span>
            </div>
          </div>
        </div>
        <div style="background-color: ${emailColors.primary['50']}; padding: 28px; text-align: center; border-top: 1px solid ${emailColors.primary['200']};">
          <p style="color: ${emailColors.primary['600']}; margin: 0; font-size: 12px;">
            Este é um e-mail automático. Em caso de dúvidas, responda a este e-mail ou fale conosco pelo site.
          </p>
          <p style="color: ${emailColors.primary['600']}; margin: 12px 0 0 0; font-size: 12px;">
            © ${new Date().getFullYear()} ${env.app.name}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
