import { Router } from 'express';

import { rateLimiterStrict } from '@/middlewares/rate-limiter';
import { validate } from '@/middlewares/validate-request';

import { registerUser, verifyLogin } from './repository';
import { loginSchema, registerSchema } from './schema';
import { createAccessToken, createRefreshToken, setRefreshCookie, verifyToken } from './utils';

const router = Router();

router.post('/register', validate(registerSchema), rateLimiterStrict, async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        await registerUser(email, password, name);

        res.status(200).send({ message: 'Successfully signed up' });
    } catch (error) {
        next(error);
    }
});

router.post('/login', validate(loginSchema), rateLimiterStrict, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await verifyLogin(email, password);
        const accessToken = createAccessToken(user.id, user.email, user.name);
        const refreshToken = createRefreshToken(user.id, user.email, user.name);
        setRefreshCookie(res, refreshToken);

        res.status(200).send({ accessToken });
    } catch (error) {
        next(error);
    }
});

router.post('/refresh', async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        const { id, email, name } = verifyToken(refreshToken);
        const accessToken = createAccessToken(id, email, name);

        res.status(200).send({ accessToken });
    } catch (error) {
        next(error);
    }
});

export default router;
