import express from 'express';
const router = express.Router();

import lists from './lists/lists.js';
import collection from './collection.js';
import dashboard from './dashboard.js';


router.use('/lists', lists);
router.use('/collection', collection);
router.use('/dashboard', dashboard);

export default router