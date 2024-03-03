import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import db from '@/db';
import { users } from '@/models/users';
import { ConflictError, UnauthorizedError } from '@/utils/errors';

export const getUser = async (email: string) => {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    return user;
};

export const verifyLogin = async (email: string, password: string) => {
    const user = await getUser(email);

    if (!user) throw new UnauthorizedError('Invalid username or password');

    const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordIsValid) throw new UnauthorizedError('Invalid username or password');

    return user;
};

export const registerUser = async (email: string, password: string, name: string) => {
    const existingUser = await getUser(email);
    if (existingUser) throw new ConflictError('A user with that email already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({ email, name, passwordHash });
};
