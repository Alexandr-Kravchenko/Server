import express from 'express';
import controller from '../controllers/TodolistController.js';

const router = express.Router()

router.route('/')
    .get((req, res) => {
        if (Object.keys(req.query).length === 0) {
            controller
                .findAllLists()
                .then(data => res.json(data))
        } else if (req.query.listId && req.query.todoId === 'all') {
            controller
                .findAllTodoByListId(+req.query.listId)
                .then(data => {
                    if (data.length === 0) {
                        res.status(404).json({ error: 'Sorry, but requested list was not found' })
                    } else {
                        res.json(data)
                    }
                })
        } else if (req.query.listId && req.query.todoId) {
            controller
                .findTodoById(+req.query.listId, +req.query.todoId)
                .then(data => {
                    if (data.length === 0) {
                        res.status(404).json({ error: 'Sorry, but requested todo was not found' });
                    } else {
                        res.json(data);
                    }
                })
        }
    })
    .post((req, res) => {
        if (req.body.listId) {
            controller
                .createTodo(+req.body.listId, req.body.title)
                .then(data => {
                    if (data.severity === 'ERROR') res.status(404).json({ error: 'Sorry, but requested list was not found' })
                    res.json(data)
                })
        } else {
            controller
                .createList(req.body.title)
                .then(data => {
                    if (data.severity === 'ERROR') res.status(404).json({ error: 'Sorry, but something oops' })
                    res.json(data)
                })
        }
    })
    .patch((req, res) => {
        controller
            .updateTodoById(+req.body.listId, +req.body.todoId, req.body)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data)
                }
            })
    })
    .put((req, res) => {
        controller
            .replaceTodoById(+req.body.listId, +req.body.todoId, req.body)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } else {
                    res.json(data)
                }
            })
    })
    .delete((req, res) => {
        if (req.body.listId) {
            if (req.body.todoId) {
                controller
                    .removeTodoById(+req.body.listId, +req.body.todoId)
                    .then(data => {
                        if (data.length === 0) {
                            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                        } else {
                            res.json(data)
                        }
                    })
            } else {
                controller
                    .removeListById(req.body.listId)
                    .then(data => {
                        if (data.length === 0) {
                            res.status(404).json({ error: 'Sorry, but requested list was not found' })
                        } else {
                            res.json(data)
                        }
                    })
            }
        }
    });


export default router;
