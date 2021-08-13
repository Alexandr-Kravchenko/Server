import express from 'express';
import controller from '../controllers/TodolistController.js';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        controller.getDashboard()
            .then(data => res.json(data))

/*             .then(data => {
                if(data.length === 0) {
                    res.json({status: 'You are free today'})
                } else {
                    res.json(data)
                }
            }) */
    })

export default router;