import dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.NODE_ENV;

export const APP_PORT = Number(process.env.APP_PORT) || 8080;
export const ORIGIN = process.env.ORIGIN || '*';

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_MAX_CONNECTIONS = Number(process.env.DB_MAX_CONNECTIONS) || 11;
export const DB_SSL =
    ENV !== 'DEVELOPMENT'
        ? {
              rejectUnauthorized: true,
              ca: process.env.DB_SSL_CA,
          }
        : undefined;
