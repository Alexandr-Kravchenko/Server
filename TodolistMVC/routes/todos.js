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
        if (req.query.title) {
            if (req.query.listId) {
                let list = controller.createTodo(req.query.listId, req.query.title);
                if (list) {
                    res.json(list);
                } else {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                }
            } else {
                res.status(201).json(controller.createList(req.query.title));
            }
        }
    })
    .patch((req, res) => {
        if (req.query.listId) {
            if (req.query.todoId) {
                let body = {
                    title: req.query.title, 
                    done: req.query.done
                }
                let todo = controller.updateTodoById(req.query.listId, req.query.todoId, body);
                if (todo) {
                    res.status(201).json(todo);
                } else {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                }
            }
        }
    })
    .put((req, res) => {
        let todo = controller.replaceTodoById(req.query.listId, req.query.todoId, req.query);
        if (todo) {
            res.status(201).json(todo);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
        }
    })
    .delete((req, res) => {
        if (req.query.listId) {
            if (req.query.todoId) {
                let status = controller.removeTodoById(req.query.listId, req.query.todoId);
                if (status) {
                    res.status(200).json(status);
                } else {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' });
                }
            } else {
                let status = controller.removeListById(req.query.listId);
                if (status) {
                    res.status(200).json(status);
                } else {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' });
                }
            }
        }
    });


export default router;
