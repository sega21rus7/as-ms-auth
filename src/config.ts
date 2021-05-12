export default () => ({
  PORT: process.env.PORT || 3000,
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'server',
  POSTGRES_DB: process.env.POSTGRES_DB || 'as-ms-auth',
  JWT_SECRET: process.env.JWT_SECRET || 'jwt',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  BCRYPT_SALT: process.env.BCRYPT_SALT || '228',
});
