import express from 'express';

import authenticateUser from '../../middlewares/authenticate-user';
import validate from '../../middlewares/validate-request';
import { createPost, deletePost, getPost, getPostsByUser, updatePost } from './repository';
import { createPostSchema, updatePostSchema } from './schema';

const router = express.Router();

router.post('/', validate(createPostSchema), authenticateUser, async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.id;
        const post = await createPost(title, body, userId);
        res.status(200).send({ post });
    } catch (error) {
        res.status(400).send({ errror: 'Something went wrong creating your post' });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const postId = parseInt(req.params.postId);
        const post = await getPost(postId);
        if (!post) return res.status(404).send({ error: 'Could not find post' });
        res.status(200).send({ post });
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong getting your post' });
    }
});

router.put('/:postId', validate(updatePostSchema), authenticateUser, async (req, res) => {
    try {
        const { body } = req.body;
        const postId = parseInt(req.params.postId);
        const userId = req.user.id;
        const post = await updatePost(body, userId, postId);
        if (!post) return res.status(404).send({ error: 'Could not find post' });
        res.status(200).send({ post });
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong updating your post' });
    }
});

router.delete('/:postId', authenticateUser, async (req, res) => {
    try {
        const postId = parseInt(req.params.postId);
        const userId = req.user.id;
        const post = await deletePost(postId, userId);
        if (!post) return res.status(404).send({ error: 'Could not find post' });

        res.status(200).send({ message: 'Successfully deleted post' });
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong deleting your post' });
    }
});

router.get('/users/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const posts = await getPostsByUser(userId);
        res.status(200).send({ posts });
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong getting posts' });
    }
});

export default router;
