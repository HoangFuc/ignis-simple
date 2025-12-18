import {
  BaseEntity,
  createRelations,
  generateIdColumnDefs,
  generateTzColumnDefs,
  generateUserAuditColumnDefs,
  model,
  TTableObject,
} from '@venizia/ignis';
import { integer, pgTable, text, unique } from 'drizzle-orm/pg-core';

const TABLE_NAME = 'product';

// --------------------------------------------------
export const productTable = pgTable(
  TABLE_NAME,
  {
    ...generateIdColumnDefs({ id: { dataType: 'string' } }),
    ...generateTzColumnDefs(),
    ...generateUserAuditColumnDefs({
      created: { dataType: 'string', columnName: 'created_by' },
      modified: { dataType: 'string', columnName: 'modified_by' },
    }),
    name: text('name').notNull(),
    code: text('code').notNull(),
    description: text('description'),
    price: integer('price').notNull(),
  },
  def => [unique(`UQ_${TABLE_NAME}_code`).on(def.code)],
);

export const productRelations = createRelations({
  source: productTable,
  relations: [],
});

export type TProductSchema = typeof productTable;
export type TProduct = TTableObject<TProductSchema>;

// --------------------------------------------------
@model({ type: 'entity', skipMigrate: false })
export class Product extends BaseEntity<TProductSchema> {
  static readonly TABLE_NAME = Product.name;

  constructor() {
    super({
      name: Product.TABLE_NAME,
      schema: productTable,
    });
  }
}
