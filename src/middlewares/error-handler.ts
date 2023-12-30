import { NextFunction, Request, Response } from 'express';

export default function errorHandler(err: Error, _: Request, res: Response, next: NextFunction) {
    if (!err) return next();

    res.status(500).send('Internal Server Error');
}
