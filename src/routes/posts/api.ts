import { Router } from 'express';

import { authenticateUser } from '@/middlewares/authenticate-user';
import { validate } from '@/middlewares/validate-request';
import { UnauthorizedError } from '@/utils/errors';

import { createPost, deletePost, getPost, getPostsByUser, updatePost } from './repository';
import { createPostSchema, updatePostSchema } from './schema';

const router = Router();

router.post('/', validate(createPostSchema), authenticateUser, async (req, res, next) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.id;

        const post = await createPost(title, body, userId);

        res.status(200).send({ post });
    } catch (error) {
        next(error);
    }
});

router.get('/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId;

        const post = await getPost(postId);

        res.status(200).send({ post });
    } catch (error) {
        next(error);
    }
});

router.put('/:postId', validate(updatePostSchema), authenticateUser, async (req, res, next) => {
    try {
        const { body } = req.body;
        const postId = req.params.postId;
        const userId = req.user.id;

        const post = await getPost(postId);

        if (post.userId !== userId) throw new UnauthorizedError('Post does not belong to user');

        const updatedPost = await updatePost(body, postId);

        res.status(200).send({ post: updatedPost });
    } catch (error) {
        next(error);
    }
});

router.delete('/:postId', authenticateUser, async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;

        const post = await getPost(postId);

        if (post.userId !== userId) throw new UnauthorizedError('Post does not belong to user');

        await deletePost(postId);

        res.status(200).send({ message: 'Successfully deleted post' });
    } catch (error) {
        next(error);
    }
});

router.get('/users/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const posts = await getPostsByUser(userId);

        res.status(200).send({ posts });
    } catch (error) {
        next(error);
    }
});

export default router;
