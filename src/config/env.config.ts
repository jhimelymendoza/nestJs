import * as process from 'process';

export const envConfiguration = () => ({
  environment: process.env.NODE_ENV ?? 'dev',
  mongoDb: process.env.MONGO_DB,
  port: process.env.PORT ?? 3001,
  defaultLimit: process.env.DEFAULT_LIMIT,
});
