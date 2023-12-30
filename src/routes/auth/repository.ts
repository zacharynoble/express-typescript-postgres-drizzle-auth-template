import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import db from '../../db';
import { users } from '../../models/users';

export async function getUser(email: string) {
    const res = await db.select().from(users).where(eq(users.email, email)).limit(1);

    return res[0];
}

export async function verifyLogin(email: string, password: string) {
    const user = await getUser(email);

    if (!user) return null;

    const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
    return passwordIsValid ? user : null;
}

export async function registerUser(email: string, password: string, name: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({ email, name, passwordHash });
}
