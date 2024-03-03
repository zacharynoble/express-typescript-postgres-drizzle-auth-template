import { NextFunction, Request, Response } from 'express';

import { verifyToken } from '@/routes/auth/utils';
import { UnauthorizedError } from '@/utils/errors';

declare module 'express-serve-static-core' {
    interface Request {
        user: { id: string; email: string; name: string };
    }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new UnauthorizedError('Authorization token missing in request');

        const userTokenData = verifyToken(token);
        req.user = userTokenData;

        next();
    } catch (error) {
        next(error);
    }
};
