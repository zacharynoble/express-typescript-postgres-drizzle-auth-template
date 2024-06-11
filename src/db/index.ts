import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { DB_DATABASE, DB_HOST, DB_MAX_CONNECTIONS, DB_PASSWORD, DB_PORT, DB_SSL, DB_USER } from '@/config';

const pg = postgres({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    ssl: DB_SSL,
    max: DB_MAX_CONNECTIONS,
    onnotice: () => {},
});

export const db = drizzle(pg);

migrate(db, { migrationsFolder: 'drizzle' });
