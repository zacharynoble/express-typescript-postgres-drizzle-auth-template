import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { ForbiddenError, NotFoundError } from '@/library/errors';
import { posts } from '@/models/posts';

export const createPost = async (title: string, body: string, userId: string) => {
    const [post] = await db.insert(posts).values({ title, body, userId }).returning();

    return post;
};

export const getPost = async (postId: string) => {
    const [post] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
    if (!post) throw new NotFoundError('Post not found');

    return post;
};

export const updatePost = async (body: string, postId: string, userId: string) => {
    const post = await getPost(postId);
    if (post.userId !== userId) throw new ForbiddenError('Post does not belong to user');

    const [updatedPost] = await db.update(posts).set({ body }).where(eq(posts.id, postId)).returning();

    return updatedPost;
};

export const deletePost = async (postId: string, userId: string) => {
    const post = await getPost(postId);
    if (post.userId !== userId) throw new ForbiddenError('Post does not belong to user');

    await db.delete(posts).where(eq(posts.id, postId));
};

export const getPostsByUser = async (userId: string) => {
    return await db.select().from(posts).where(eq(posts.userId, userId));
};
