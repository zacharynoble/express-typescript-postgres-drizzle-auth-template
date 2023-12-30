import express from 'express';

import { rateLimiterStrict } from '../../middlewares/rate-limiter';
import validate from '../../middlewares/validate-request';
import { getUser, registerUser, verifyLogin } from './repository';
import { loginSchema, registerSchema } from './schema';
import { createAccessToken, createRefreshToken, setRefreshCookie, verifyToken } from './utils';

const router = express.Router();

router.post('/register', validate(registerSchema), rateLimiterStrict, async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await getUser(email);
        if (user) return res.status(409).send({ error: 'Someone with that email already exists' });
        await registerUser(email, password, name);

        res.status(200).send({ message: 'Successfully signed up' });
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong signing you up' });
    }
});

router.post('/login', validate(loginSchema), rateLimiterStrict, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await verifyLogin(email, password);
        if (!user) return res.status(401).send({ errror: 'Invalid Username or Password' });

        const accessToken = createAccessToken(user.id, user.email, user.name);
        const refreshToken = createRefreshToken(user.id, user.email, user.name);
        setRefreshCookie(res, refreshToken);

        res.status(200).send({ accessToken });
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong logging you in' });
    }
});

router.post('/refresh', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const { id, email, name } = verifyToken(refreshToken);
        const accessToken = createAccessToken(id, email, name);
        res.status(200).send({ accessToken });
    } catch (error) {
        res.status(401).send({ error: 'Invalid refresh token' });
    }
});

export default router;
