import { Product, productRelations, TProductSchema } from '@/models/entities/product.model';
import { DefaultCRUDRepository, inject, repository } from '@venizia/ignis';
import type { IDataSource } from '@venizia/ignis';

@repository({})
export class ProductRepository extends DefaultCRUDRepository<TProductSchema> {
  constructor(
    @inject({ key: 'datasources.PostgresDataSource' })
    dataSource: IDataSource,
  ) {
    super({
      dataSource,
      entityClass: Product,
      relations: productRelations.definitions,
    });
  }
}
