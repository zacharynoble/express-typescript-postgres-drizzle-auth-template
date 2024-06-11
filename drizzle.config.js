import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './src/config';

export default {
    schema: './src/models',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    },
};
