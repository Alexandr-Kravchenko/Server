import express from 'express';
import controller from '../../controllers/TodolistController.js';

const router = express.Router({ mergeParams: true });

router.route('/')
    .get((req, res) => {
        let list = controller.findAllTodoByListId(req.params.listId);
        if (list) {
            res.json(list);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
        }
    })
    .post((req, res) => {
        controller
            .createTodo(req.params.listId, req.body.title)
            .then(data => res.json(data));

        /*         if (list) {
                    res.json(list);
                } else {
                    res.status(404).json({ error: 'Sorry, but requested todo was not found' })
                } */
    });

router.route('/:todoId')
    .get((req, res) => {
        let todo = controller.findTodoById(req.params.listId, req.params.todoId);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
        }
    })
    .patch((req, res) => {
        let todo = controller.updateTodoById(req.params.listId, req.params.todoId, req.body);
        if (todo) {
            res.status(201).json(todo);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
        }
    })
    .put((req, res) => {
        let todo = controller.replaceTodoById(req.params.listId, req.params.todoId, req.body);
        if (todo) {
            res.status(201).json(todo);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
        }
    })
    .delete((req, res) => {
        let status = controller.removeTodoById(req.params.listId, req.params.todoId);
        if (status) {
            res.status(200).json(status);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' });
        }
    });

export default router;