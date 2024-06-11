import { FastifyPluginCallback } from 'fastify';

import { withZod } from '@/library/zod';
import { authenticate } from '@/plugins/authenticate';

import { createPost, deletePost, getPost, getPostsByUser, updatePost } from './repository';
import { createPostSchema, deletePostSchema, getPostsByUserSchema, getPostSchema, updatePostSchema } from './schema';

export const posts: FastifyPluginCallback = (fastify, options, done) => {
    const api = withZod(fastify);

    api.post(
        '/',
        {
            preHandler: [authenticate],
            schema: createPostSchema,
        },
        async req => {
            const {
                body: { title, body },
                user: { id: userId },
            } = req;

            return await createPost(title, body, userId);
        },
    );

    api.get(
        '/:postId',
        {
            schema: getPostSchema,
        },
        async req => {
            const {
                params: { postId },
            } = req;

            return await getPost(postId);
        },
    );

    api.patch(
        '/:postId',
        {
            preHandler: [authenticate],
            schema: updatePostSchema,
        },
        async req => {
            const {
                body: { body },
                params: { postId },
                user: { id: userId },
            } = req;

            return await updatePost(body, postId, userId);
        },
    );

    api.delete(
        '/:postId',
        {
            preHandler: [authenticate],
            schema: deletePostSchema,
        },
        async req => {
            const {
                params: { postId },
                user: { id: userId },
            } = req;

            await deletePost(postId, userId);
        },
    );

    api.get(
        '/users/:userId',
        {
            schema: getPostsByUserSchema,
        },
        async req => {
            const {
                params: { userId },
            } = req;

            return {
                posts: await getPostsByUser(userId),
            };
        },
    );

    done();
};
