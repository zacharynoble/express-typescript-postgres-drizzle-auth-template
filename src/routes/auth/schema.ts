import { z } from 'zod';

const email = z.string().min(1, 'Please enter your email').email();

export const loginSchema = {
    body: z.object({
        email,
        password: z.string().min(1, 'Please enter your password'),
    }),
};

export const registerSchema = {
    body: z.object({
        email,
        name: z.string().min(1, 'Please enter your name'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
    }),
};
