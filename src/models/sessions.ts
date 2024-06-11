import { index, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';

export const sessions = pgTable(
    'sessions',
    {
        sessionId: text('session_id').primaryKey(),
        userId: uuid('user_id')
            .references(() => users.id)
            .notNull(),
    },
    table => {
        return {
            userIdIdx: index().on(table.userId),
        };
    },
);
