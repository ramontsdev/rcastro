import type { IGetProductBySlug } from '@/domain/usecases/commerce/GetProductBySlug';
import { notFound, ok } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http';

export class GetProductBySlugController implements IController {
  constructor(private readonly getProductBySlug: IGetProductBySlug) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const slug = httpRequest.params.slug;

    if (!slug) {
      return notFound({ error: 'Produto não encontrado.' });
    }

    const product = await this.getProductBySlug.getBySlug(slug);

    if (!product) {
      return notFound({ error: 'Produto não encontrado.' });
    }

    return ok(product);
  }
}

