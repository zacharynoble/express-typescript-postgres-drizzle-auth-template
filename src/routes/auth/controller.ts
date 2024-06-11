import { FastifyPluginCallback } from 'fastify';

import { withZod } from '@/library/zod';
import { authenticate } from '@/plugins/authenticate';

import { deleteSession, login, register } from './repository';
import { loginSchema, registerSchema } from './schema';

export const auth: FastifyPluginCallback = (fastify, options, done) => {
    const api = withZod(fastify);

    api.post(
        '/register',
        {
            schema: registerSchema,
            config: {
                rateLimit: {
                    max: 15,
                    timeWindow: '1 hour',
                },
            },
        },
        async req => {
            const {
                body: { email, password, name },
            } = req;

            await register(email, password, name);
        },
    );

    api.post(
        '/login',
        {
            schema: loginSchema,
            config: {
                rateLimit: {
                    max: 15,
                    timeWindow: '1 hour',
                },
            },
        },
        async (req, reply) => {
            const {
                body: { email, password },
            } = req;

            const sessionId = await login(email, password);

            reply.setCookie('sessionId', sessionId, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
            });
        },
    );

    api.post('/logout', async (req, reply) => {
        const {
            cookies: { sessionId },
        } = req;

        await deleteSession(sessionId);
        reply.clearCookie('sessionId');
    });

    api.get(
        '/user',
        {
            preHandler: [authenticate],
        },
        req => req.user,
    );

    done();
};
