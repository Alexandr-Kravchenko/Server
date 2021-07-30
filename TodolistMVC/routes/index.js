import express from 'express';
const router = express.Router();

import todoitem from './todoitem.js';

router.use('/todoitem', todoitem);

export default router