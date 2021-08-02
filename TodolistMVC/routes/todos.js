import express from 'express';
import controller from '../controllers/TodolistController.js';

const router = express.Router()

router.route('/')
    .get((req, res) => {
        if (Object.keys(req.query).length === 0) {
            res.json(controller.findAllLists())
        } else if (req.query.listId && req.query.todoId === 'all') {
            let list = controller.findAllTodoByListId(req.query.listId);
            if (list) {
                res.json(list);
            } else {
                res.status(404).json({ error: 'Sorry, but requested todo was not found' })
            }
        } else if (req.query.listId && req.query.todoId) {
            let todo = controller.findTodoById(req.query.listId, req.query.todoId);
            if (todo) {
                res.json(todo);
            } else {
                res.status(404).json({ error: 'Sorry, but requested todo was not found' })
            }
        }
    })
    .post((req, res) => {
        if (req.body.listId) {
            let list = controller.createTodo(req.body.listId, req.body.title);
            if (list) {
                res.json(list);
            } else {
                res.status(404).json({ error: 'Sorry, but requested todo was not found' })
            }
        } else {
            res.status(201).json(controller.createList(req.body.title));
        }
    })
    .patch((req, res) => {
            let todo = controller.updateTodoById(req.body.listId, req.body.todoId, req.body);
            if (todo) {
                res.status(201).json(todo);
            } else {
                res.status(404).json({ error: 'Sorry, but requested todo was not found' })
            }
    })
    .put((req, res) => {
        let todo = controller.replaceTodoById(req.body.listId, req.body.todoId, req.body);
        if (todo) {
            res.status(201).json(todo);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
        }
    })
    .delete((req, res) => {
        if (req.body.listId) {
            if (req.body.todoId) {
                let status = controller.removeTodoById(req.body.listId, req.body.todoId);
                if (status) {
                    res.status(200).json(status);
                } else {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' });
                }
            } else {
                let status = controller.removeListById(req.body.listId);
                if (status) {
                    res.status(200).json(status);
                } else {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' });
                }
            }
        }
    });


export default router;
