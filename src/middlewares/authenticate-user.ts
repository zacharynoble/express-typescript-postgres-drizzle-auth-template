import { NextFunction, Request, Response } from 'express';

import { verifyToken } from '../routes/auth/utils';

declare module 'express-serve-static-core' {
    interface Request {
        user: { id: number; email: string; name: string };
    }
}

export default function authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) throw new Error('Unauthorized');

        const userTokenData = verifyToken(token);
        req.user = userTokenData;

        next();
    } catch {
        res.status(401).send('Unauthorized');

        next();
    }
}
