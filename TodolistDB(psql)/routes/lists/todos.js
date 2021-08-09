import express from 'express';
import controller from '../../controllers/TodolistController.js';
const router = express.Router({ mergeParams: true });

router.route('/')
    .get((req, res) => {
        controller
            .findAllTodoByListId(+req.params.listId, req.query.all)
            .then(data => {
                if (data.rows.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested list was not found' })
                } else {
                    res.json(data.rows)
                }
            })
    })
    .post((req, res) => {
        controller
            .createTodo(+req.params.listId, req.body)
            .then(data => res.json(data))
            .catch(err => res.status(400))
    });

router.route('/:todoId')
    .get((req, res) => {
        controller
            .findTodoById(+req.params.listId, +req.params.todoId)
            .then(data => {
                if (data.rows.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data.rows[0])
                }
            })
    })
    .patch((req, res) => {
        controller
            .updateTodoById(+req.params.listId, +req.params.todoId, req.body)
            .then(data => {
                if (data.rows.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data.rows[0])
                }
            })
    })
    .put((req, res) => {
        controller
            .replaceTodoById(+req.params.listId, +req.params.todoId, req.body)
            .then(data => {
                if (data.rows.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data.rows[0])
                }
            })
    })
    .delete((req, res) => {
        controller
            .removeTodoById(+req.params.listId, +req.params.todoId)
            .then(data => {
                if (data.rows.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data.rows[0])
                }
            })
    });

export default router;