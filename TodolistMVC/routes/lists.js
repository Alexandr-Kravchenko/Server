import express from 'express';
import controller from '../controllers/TodolistController.js';
import todo from './todo.js'

const router = express.Router()

router.route('/:listId?')
    .get((req, res) => {
        res.json(controller.findAllLists())
    })
    .post((req, res) => {
        res.status(201).json(controller.createList(req.body.title));
    })
    .delete((req, res) => {
        let status = controller.removeListById(req.params.listId);
        if (status) {
            res.status(204);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' });
        }
    });

router.use('/:listId/todos', todo)

export default router;
