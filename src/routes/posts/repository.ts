import { eq } from 'drizzle-orm';

import db from '@/db';
import { posts } from '@/models/posts';
import { NotFoundError } from '@/utils/errors';

export const createPost = async (title: string, body: string, userId: string) => {
    return await db.insert(posts).values({ title, body, userId }).returning();
};

export const updatePost = async (body: string, postId: string) => {
    const [post] = await db.update(posts).set({ body }).where(eq(posts.id, postId)).returning();

    return post;
};

export const deletePost = async (postId: string) => {
    await db.delete(posts).where(eq(posts.id, postId));
};

export const getPost = async (postId: string) => {
    const [post] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

    if (!post) throw new NotFoundError('Post not found');

    return post;
};

export const getPostsByUser = async (userId: string) => {
    return await db.select().from(posts).where(eq(posts.userId, userId));
};
