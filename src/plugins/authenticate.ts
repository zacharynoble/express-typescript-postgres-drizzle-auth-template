import { FastifyRequest } from 'fastify';

import { UnauthorizedError } from '@/library/errors';
import { getUserFromSession } from '@/routes/auth/repository';

export const authenticate = async <T extends FastifyRequest>(req: T) => {
    const {
        cookies: { sessionId },
    } = req;

    if (!sessionId) throw new UnauthorizedError('Session Cookie missing in request');

    const user = await getUserFromSession(sessionId);
    req.user = user;
};
