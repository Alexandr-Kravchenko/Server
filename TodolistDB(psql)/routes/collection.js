import express from 'express';
import controller from '../controllers/TodolistController.js';

const router = express.Router();

router.route('/today')
    .get((req, res) => {
        controller
            .findTodosCurrentDay()
            .then(data => {
                if(data.rows.length === 0) {
                    res.json({status: 'You are free today'})
                } else {
                    res.json(data.rows)
                }
            })
    })

export default router;