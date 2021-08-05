import express from 'express';
import controller from '../controllers/TodolistController.js';

const router = express.Router();

router.route('/')
    .get((res, req) => {

    })

export default router;