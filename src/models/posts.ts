import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';

export const posts = pgTable('posts', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    userId: uuid('user_id')
        .references(() => users.id)
        .notNull(),
});
