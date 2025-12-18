import {
  BaseApplication,
  type IApplicationConfigs,
  type IApplicationInfo,
  type ValueOrPromise,
} from '@venizia/ignis';
import packageJson from '../package.json';
import { ConfigurationController, ProductController } from './controllers';
import { PostgresDataSource } from './datasources/postgres.datasource';
import { ConfigurationRepository, ProductRepository } from './repositories';

export const appConfigs: IApplicationConfigs = {
  host: process.env.HOST ?? '0.0.0.0',
  port: +(process.env.PORT ?? 3000),
  path: { base: '/api', isStrict: true },
};

export class Application extends BaseApplication {
  override getAppInfo(): ValueOrPromise<IApplicationInfo> {
    return packageJson;
  }

  // Hook 1: Configure static assets
  staticConfigure(): void {
    // Example: this.static({ folderPath: './public' })
  }

  //Hook 2: Add global middlewares
  setupMiddlewares(): void {
    // Example: this.server.use(cors())
  }

  // Hook 3: Register your resources (THIS IS THE MOST IMPORTANT ONE)
  preConfigure(): ValueOrPromise<void> {
    this.dataSource(PostgresDataSource);

    this.repository(ConfigurationRepository);
    this.repository(ProductRepository);

    this.controller(ConfigurationController);
    this.controller(ProductController);
  }

  // Hook 4: Do cleanup or extra work after everything is set up
  postConfigure(): ValueOrPromise<void> {
    // Example: Seed database, start background jobs, etc.
  }
}
