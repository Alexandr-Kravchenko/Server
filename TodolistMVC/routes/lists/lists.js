import express from 'express';
import controller from '../../controllers/TodolistController.js';
import todo from './todo.js'

const router = express.Router()

router.route('/:listId?')
    .get((req, res) => {
        if(req.params.listId) {
            controller
                .findListById(req.params.listId)
                .then(data => {
                    res.status(201).json(data)
                })
        } else {
            controller
                .findAllLists()
                .then(data => {
                    res.status(201).json(data)
                })
        }
    })
    .post((req, res) => {
        controller
            .createList(req.body.title)
            .then(data => {
                res.status(201).json(data)
            });
    })
    .delete((req, res) => {
        controller
            .removeListById(req.params.listId)
            .then(data => {
                res.status(201).json(data)
            });

        /*         if (status) {
                    res.status(200).json(status);
                } else {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' });
                } */
    });

router.use('/:listId/todos', todo)

export default router;
