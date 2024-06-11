import { z } from 'zod';

const postId = z.string().uuid();
const userId = z.string().uuid();
const title = z.string().min(1, 'Please enter a title');
const body = z.string().min(1, 'Post body cannot be empty');

export const createPostSchema = {
    body: z.object({
        title,
        body,
    }),
};

export const updatePostSchema = {
    params: z.object({
        postId,
    }),
    body: z.object({
        body,
    }),
};

export const getPostSchema = {
    params: z.object({
        postId,
    }),
};

export const deletePostSchema = {
    params: z.object({
        postId,
    }),
};

export const getPostsByUserSchema = {
    params: z.object({
        userId,
    }),
};
