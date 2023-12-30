import express from 'express';

import auth from './auth/api';
import posts from './posts/api';

const router = express.Router();

router.use('/', auth);
router.use('/posts', posts);

export default router;
