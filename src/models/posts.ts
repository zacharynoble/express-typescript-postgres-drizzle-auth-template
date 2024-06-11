import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';

export const posts = pgTable(
    'posts',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        title: text('title').notNull(),
        body: text('body').notNull(),
        userId: uuid('user_id')
            .references(() => users.id)
            .notNull(),
        createdDate: timestamp('created_date').notNull().defaultNow(),
        updatedDate: timestamp('updated_date')
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    table => {
        return {
            userIdIdx: index().on(table.userId),
        };
    },
);
