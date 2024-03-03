import { NextFunction, Request, Response } from 'express';

import { CustomError } from '@/utils/errors';

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next();

    let status = 500;
    let message = 'Internal Server Error';

    if (error instanceof CustomError) {
        message = error.message;
        status = error.status;
    }

    res.status(status).json({ message });
};
