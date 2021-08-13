import express from 'express';
import controller from '../../controllers/TodolistController.js';

const router = express.Router({ mergeParams: true });

router.route('/')
    .get((req, res) => {
        controller
            .findAllTodoByListId(+req.params.listId, req.query.all)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data)
                }
            });
    })
    .post((req, res) => {
        controller
            .createTodo(+req.params.listId, req.body)
            .then(data => {
                res.json({ status: 'Todo created' })
            });
    });

router.route('/:todoId')
    .get((req, res) => {
        controller
            .findTodoById(+req.params.listId, +req.params.todoId)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data)
                }
            });
    })
    .patch((req, res) => {
        controller
            .updateTodoById(+req.params.listId, +req.params.todoId, req.body)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json({ status: 'todo was updated' })
                }
            });
    })
    .put((req, res) => {
        controller
            .replaceTodoById(+req.params.listId, +req.params.todoId, req.body)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json({ status: 'todo was updated' })
                }
            });
    })
    .delete((req, res) => {
        controller
            .removeTodoById(+req.params.listId, +req.params.todoId)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json({status: 'todo was deleted'})
                }
            });
    });

export default router;