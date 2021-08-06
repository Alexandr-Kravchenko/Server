import express from 'express';
import controller from '../controllers/TodolistController.js';

const router = express.Router();

router.route('/today')
    .get((req, res) => {
        controller
            .findTodosCurrentDay()
            .then(data => {
                if(data.length === 0) {
                    res.json({status: 'You are free today'})
                } else {
                    res.json(data)
                }
            })
    })

export default router;