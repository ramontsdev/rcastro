import type { IListProducts } from '@/domain/usecases/commerce/ListProducts';
import { badRequest, ok } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http';

export class ListProductsController implements IController {
  constructor(private readonly listProducts: IListProducts) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const line = httpRequest.query.line;
    const category = httpRequest.query.category;

    if (line !== undefined && line.trim().length === 0) {
      return badRequest({ error: 'Filtro line inválido.' });
    }

    if (category !== undefined && category.trim().length === 0) {
      return badRequest({ error: 'Filtro category inválido.' });
    }

    const products = await this.listProducts.list({
      line: line?.trim(),
      category: category?.trim(),
    });

    return ok(products);
  }
}

