import { FastifyPluginCallback } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { auth } from './auth/controller';
import { posts } from './posts/controller';

export const routes: FastifyPluginCallback = (fastify, options, done) => {
    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    fastify.register(auth);
    fastify.register(posts, { prefix: '/posts' });

    done();
};
