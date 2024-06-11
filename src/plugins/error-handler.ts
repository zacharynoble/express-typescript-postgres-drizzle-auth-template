import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@/library/errors';

interface ErrorResponse {
    status: number;
    error: {
        message: string;
        detail?: string;
        fields?: {
            name: string;
            message: string;
        }[];
    };
}

export const errorHandler = (error: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
    req.log.error(error);

    let status = 500;
    let message = 'Internal Server Error';
    let detail = undefined;
    let fields = undefined;

    if (error instanceof AppError) {
        status = error.status;
        message = error.message;
        detail = error.detail;
        if (error.field) {
            fields = [{ name: error.field, message: error.message }];
        }
    } else if (error instanceof ZodError) {
        status = 422;
        message = 'One or more fields are incorrectly formatted';
        fields = error.issues.map(issue => ({
            name: String(issue.path[0]),
            message: issue.message,
        }));
    } else if (error.statusCode === 429) {
        status = 429;
        message = "You've sent too many requests, please try again later";
    }

    const response: ErrorResponse = {
        status,
        error: {
            message,
            detail,
            fields,
        },
    };

    reply.status(status).send(response);
};
