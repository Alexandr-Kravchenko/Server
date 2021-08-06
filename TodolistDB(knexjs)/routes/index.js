import express from 'express';
const router = express.Router();

import lists from './lists/lists.js';
import collection from './collection.js';

router.use('/lists', lists);
router.use('/collection', collection);

export default router