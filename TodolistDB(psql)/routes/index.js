import express from 'express';
const router = express.Router();

import lists from './lists/lists.js';
import dashboard from './dashboard.js';
import collection from './collection.js';


router.use('/lists', lists);
router.use('/dashboard', dashboard);
router.use('/collection', collection);


export default router