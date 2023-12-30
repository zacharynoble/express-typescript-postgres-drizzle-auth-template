import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

/* App Config */
export const APP_PORT = process.env.APP_PORT || 8080;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;
export const ORIGIN = process.env.ORIGIN || '*';

/* DB Config */
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_MAX_CONNECTIONS = Number(process.env.DB_MAX_CONNECTIONS) || 20;
export const DB_SSL =
    process.env.NODE_ENV !== 'DEVELOPMENT'
        ? {
              rejectUnauthorized: true,
              ca: process.env.DB_SSL_CA,
          }
        : undefined;
