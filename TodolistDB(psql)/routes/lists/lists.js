import express from 'express';
import controller from '../../controllers/TodolistController.js';
import todos from './todos.js';
import dashboard from './dashboard.js';

const router = express.Router()

router.route('/:listId?')
    .get((req, res) => {
        if (req.params.listId) {
            controller
                .findListById(+req.params.listId)
                .then(data => {
                    if (data.length === 0) {
                        res.status(404).json({ error: 'Sorry, but requested list was not found' })
                    } else {
                        res.json(data)
                    }
                })
        } else {
            controller
                .findAllLists()
                .then(data => {
                    if (data.severity === 'ERROR') res.status(404).json({ error: 'Sorry, but lists was not found' })
                    res.json(data)
                })
        }
    })
    .post((req, res) => {
        controller
            .createList(req.body.title)
            .then(data => {
                if (data.severity === 'ERROR') res.status(404).json({ error: 'Sorry, but something oops' })
                res.json(data)
            })
    })
    .delete((req, res) => {
        controller
            .removeListById(req.params.listId)
            .then(data => {
                if (data.severity === 'ERROR') res.status(404).json({ error: 'Sorry, but requested list was not found' })
                res.json(data)
            })
    });

router.use('/:listId/todos', todos);
router.use('/:listId/dashboard', dashboard);

export default router;
