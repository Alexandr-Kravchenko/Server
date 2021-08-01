import express from 'express';
import controller from '../controllers/TodolistController.js';
import todoItem from './todoItem.js'

const router = express.Router()

router.route('/:listId?')
    .get((req, res) => {
        res.json(controller.find())
    })
    .post((req, res) => {
        res.status(201).json(controller.createList(req.body.title));
    })
    .delete((req, res) => {
        let status = controller.removeListById(req.params.listId);
        if(status) {
            res.status(204);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' });
        }
    });

router.route('/:listId/todos')
    .get((req, res) => {
        let list = controller.findListById(req.params.listId);
        if (list) {
            res.json(list);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
        }
    })
    .post((req, res) => {
        let list = controller.createTodo(req.params.listId, req.body.title);
        if (list) {
            res.json(list);
        } else {
            res.status(404).json({ error: 'Sorry, but requested todo was not found' })
        }
    });


router.use('/:listId/todos', todoItem)

// router.route('/:listId/todos/:todoId')
//     .get((req, res) => {
//         let todo = controller.findTodoById(req.params.listId, req.params.todoId);
//         if (todo) {
//             res.json(todo);
//         } else {
//             res.status(404).json({ error: 'Sorry, but requested todo was not found' })
//         }
//     })
//     .patch((req, res) => {
//         let todo = controller.updateTodoById(req.params.listId, req.params.todoId, req.body);
//         if (todo) {
//             res.status(201).json(todo);
//         } else {
//             res.status(404).json({ error: 'Sorry, but requested todo was not found' })
//         }
//     })
//     .put((req, res) => {
//         let todo = controller.replaceTodoById(req.params.listId, req.params.todoId, req.body);
//         if (todo) {
//             res.status(201).json(todo);
//         } else {
//             res.status(404).json({ error: 'Sorry, but requested todo was not found' })
//         }
//     })
//     .delete((req, res) => {
//         let status = controller.removeTodoById(req.params.listId, req.params.todoId);
//         if(status) {
//             res.status(204);
//         } else {
//             res.status(404).json({ error: 'Sorry, but requested todo was not found' });
//         }
//     });

export default router;
