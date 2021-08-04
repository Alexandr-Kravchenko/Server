import express from 'express';
import controller from '../../controllers/TodolistController.js';
import todo from './todo.js'

const router = express.Router()

router.route('/:listId?')
    .get((req, res) => {
        if (req.params.listId) {
            res.status(201).json(controller.findListById(req.params.listId))
        } else {
            res.status(201).json(controller.findAllLists())
        }
    })
    .post((req, res) => {
        res.status(201).json(controller.createList(req.body.title))
    })
    .delete((req, res) => {
        if (status) {
            res.status(200).json(status);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' });
        }
    });

router.use('/:listId/todos', todo)

export default router;
