import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/models/entities/configuration.model.ts',
  out: './migration',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.APP_ENV_POSTGRES_HOST!,
    port: +(process.env.APP_ENV_POSTGRES_PORT ?? 5432),
    user: process.env.APP_ENV_POSTGRES_USERNAME,
    password: process.env.APP_ENV_POSTGRES_PASSWORD,
    database: process.env.APP_ENV_POSTGRES_DATABASE!,
    ssl: false,
  },
});
