import express from 'express';
import ListController from '../../controllers/ListController.js';
import TodolistController from '../../controllers/TodolistController.js';

import todos from './todos.js';

const router = express.Router()

router.route('/todos')
    .get((req, res) => {
        TodolistController
            .findAllTodo()
            .then (data => {
                if (data === '0') {
                    res.status(404).json({ error: 'Sorry, but requested list was not found' })
                } else {
                    res.json(data);
                }
            })
    });

router.route('/:listId?')
    .get((req, res) => {
        if (req.params.listId) {
            ListController
                .findListById(+req.params.listId)
                .then(data => {
                    if (data.length === 0) {
                        res.status(404).json({ error: 'Sorry, but requested list was not found' })
                    } else {
                        res.json(data)
                    }
                })
        } else {
            ListController
                .findAllLists()
                .then(data => {
                    res.json(data)
                })
        }
    })
    .post((req, res) => {
        ListController
            .createList(req.body.title)
            .then(data => {
                res.json({ status: 'List created', list: data.dataValues })
            })
    })
    .delete((req, res) => {
        ListController
            .removeListById(req.params.listId)
            .then(data => {
                if (data === '0') {
                    res.status(404).json({ error: 'Sorry, but requested list was not found' })
                } else {
                    res.json({ status: 'List deleted' });
                }
            })
    });

router.use('/:listId/todos', todos);

export default router;
