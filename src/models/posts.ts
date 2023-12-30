import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { users } from './users';

export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    userId: integer('user_id').references(() => users.id),
});
