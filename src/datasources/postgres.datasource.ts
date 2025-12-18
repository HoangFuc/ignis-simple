import { Product, productRelations, productTable } from '@/models/entities/product.model';
import { BaseDataSource, datasource, TNodePostgresConnector, ValueOrPromise } from '@venizia/ignis';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  Configuration,
  configurationRelations,
  configurationTable,
} from '../models/entities/configuration.model';

interface IDSConfigs {
  connection: {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
  };
}

@datasource({})
export class PostgresDataSource extends BaseDataSource<TNodePostgresConnector, IDSConfigs> {
  override getConnectionString(): ValueOrPromise<string> {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super({
      name: PostgresDataSource.name,
      driver: 'node-postgres',
      config: {
        connection: {
          host: process.env.APP_ENV_POSTGRES_HOST,
          port: +(process.env.APP_ENV_POSTGRES_PORT ?? 5432),
          user: process.env.APP_ENV_POSTGRES_USERNAME,
          password: process.env.APP_ENV_POSTGRES_PASSWORD,
          database: process.env.APP_ENV_POSTGRES_DATABASE,
        },
      },
      schema: Object.assign(
        {},

        { [Configuration.TABLE_NAME]: configurationTable, [Product.TABLE_NAME]: productTable },

        configurationRelations.relations,
        productRelations.relations,
      ),
    });
  }

  override configure(): ValueOrPromise<void> {
    this.connector = drizzle({
      client: new Pool({ ...this.settings.connection, ssl: false }),
      schema: this.schema,
    });
  }
}
