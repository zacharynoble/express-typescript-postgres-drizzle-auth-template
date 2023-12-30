import { z } from 'zod';

export const createPostSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Please enter a title'),
        body: z.string().min(1, 'Post body cannot be empty'),
    }),
});

export const updatePostSchema = z.object({
    body: z.object({
        body: z.string().min(1, 'Post body cannot be empty'),
    }),
});
