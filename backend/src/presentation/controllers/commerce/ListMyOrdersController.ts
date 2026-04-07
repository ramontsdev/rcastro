import type { IListMyOrders } from '@/domain/usecases/commerce/ListMyOrders';
import { ok, unauthorized } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http';

export class ListMyOrdersController implements IController {
  constructor(private readonly listMyOrders: IListMyOrders) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.account?.userId;

    if (!userId) {
      return unauthorized({ error: 'Não autorizado' });
    }

    const orders = await this.listMyOrders.listByUserId(userId);

    return ok(orders);
  }
}

