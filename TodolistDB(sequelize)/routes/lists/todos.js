import express from 'express';
import TodolistController from '../../controllers/TodolistController.js';

const router = express.Router({ mergeParams: true });

router.route('/')
    .get((req, res) => {
        TodolistController
            .findAllTodoByListId(+req.params.listId)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data)
                }
            })
    })
    .post((req, res) => {
        TodolistController
            .createTodo(+req.params.listId, req.body)
            .then(data => {
                res.json({ status: 'Todo created' })
            })
    });

router.route('/:todoId')
    .get((req, res) => {
        TodolistController
            .findTodoById(+req.params.listId, +req.params.todoId)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data)
                }
            })
    })
    .patch((req, res) => {
        TodolistController
            .updateTodoById(+req.params.listId, +req.params.todoId, req.body)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json({ status: 'todo was updated' })
                }
            })
    })
    .put((req, res) => {
        TodolistController
            .replaceTodoById(+req.params.listId, +req.params.todoId, req.body)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json({ status: 'todo was updated' })
                }
            })
    })
    .delete((req, res) => {
        TodolistController
            .removeTodoById(+req.params.listId, +req.params.todoId)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json({status: 'todo was deleted'})
                }
            })
    });

export default router;