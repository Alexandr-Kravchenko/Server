import express from 'express';
import controller from '../controllers/TodolistController.js';

const router = express.Router();

router.route('/today')
    .get((req, res) => {
        controller
            .findTodosCurrentDay()
            .then(data => {
                console.log(data);
                res.json(data)
            })
    })

export default router;