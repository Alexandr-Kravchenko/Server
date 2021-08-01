import express from 'express';
const router = express.Router();

import todolists from './todolists.js';

router.use('/todolists', todolists);

export default router