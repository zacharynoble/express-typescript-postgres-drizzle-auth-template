import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z.string().min(1, 'Please enter your email').email(),
        password: z.string().min(1, 'Please enter your password'),
    }),
});

export const registerSchema = z.object({
    body: z.object({
        email: z.string().min(1, 'Please enter your email').email(),
        name: z.string().min(1, 'Please enter your name'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
    }),
});
