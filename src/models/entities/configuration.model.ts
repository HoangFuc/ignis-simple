import {
  BaseEntity,
  createRelations,
  generateDataTypeColumnDefs,
  generateIdColumnDefs,
  generateTzColumnDefs,
  generateUserAuditColumnDefs,
  model,
  type TTableObject,
} from '@venizia/ignis';
import { index, pgTable, text, unique } from 'drizzle-orm/pg-core';

const TABLE_NAME = 'configuration';

// --------------------------------------------------
export const configurationTable = pgTable(
  TABLE_NAME,
  {
    ...generateIdColumnDefs({ id: { dataType: 'string' } }),
    ...generateTzColumnDefs(),
    ...generateDataTypeColumnDefs(),
    ...generateUserAuditColumnDefs({
      created: { dataType: 'string', columnName: 'created_by' },
      modified: { dataType: 'string', columnName: 'modified_by' },
    }),
    code: text('code').notNull(),
    description: text('description'),
    group: text('group').notNull(),
  },
  def => [
    unique(`UQ_${TABLE_NAME}_code`).on(def.code),
    index(`IDX_${TABLE_NAME}_group`).on(def.group),
  ],
);

export const configurationRelations = createRelations({
  source: configurationTable,
  relations: [],
});

export type TConfigurationSchema = typeof configurationTable;
export type TConfiguration = TTableObject<TConfigurationSchema>;

// --------------------------------------------------
@model({ type: 'entity', skipMigrate: false })
export class Configuration extends BaseEntity<TConfigurationSchema> {
  static readonly TABLE_NAME = Configuration.name;

  constructor() {
    super({
      name: Configuration.TABLE_NAME,
      schema: configurationTable,
    });
  }
}
