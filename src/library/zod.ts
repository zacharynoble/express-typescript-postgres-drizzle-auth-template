import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export const withZod = (fastify: FastifyInstance) => {
    return fastify.withTypeProvider<ZodTypeProvider>();
};
