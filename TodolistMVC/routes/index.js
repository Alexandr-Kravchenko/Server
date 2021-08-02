import express from 'express';
const router = express.Router();

import lists from './lists/lists.js';
import todos from './todos.js';


router.use('/lists', lists);
router.use('/todos', todos);

export default router