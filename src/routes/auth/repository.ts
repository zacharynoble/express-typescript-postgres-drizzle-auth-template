import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { ConflictError, UnauthorizedError } from '@/library/errors';
import { sessions } from '@/models/sessions';
import { users } from '@/models/users';

export const getUser = async (email: string) => {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    return user;
};

export const register = async (email: string, password: string, name: string) => {
    const existingUser = await getUser(email);
    if (existingUser) throw new ConflictError('That email is already taken', { field: 'email' });

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({ email, name, passwordHash });
};

export const login = async (email: string, password: string) => {
    const user = await getUser(email);
    if (!user) throw new UnauthorizedError('Invalid username or password');

    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isCorrectPassword) throw new UnauthorizedError('Invalid username or password');

    const sessionId = crypto.randomBytes(64).toString('hex');
    await db.insert(sessions).values({ sessionId, userId: user.id });

    return sessionId;
};

export const deleteSession = async (sessionId?: string) => {
    if (sessionId) await db.delete(sessions).where(eq(sessions.sessionId, sessionId));
};

export const getUserFromSession = async (sessionId: string) => {
    const [user] = await db
        .select({ id: users.id, email: users.email, name: users.name })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(eq(sessions.sessionId, sessionId))
        .limit(1);

    if (!user) throw new UnauthorizedError('Sorry, we are unable to log you in');

    return user;
};
