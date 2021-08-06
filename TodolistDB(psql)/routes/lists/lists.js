import express from 'express';
import controller from '../../controllers/ListController.js';
import todos from './todos.js';

const router = express.Router()

router.route('/:listId?')
    .get((req, res) => {
        controller
            .findAllLists()
            .then(data => {
                if (data.severity === 'ERROR') res.status(404).json({ error: 'Sorry, but lists was not found' })
                res.json(data)
            })
    })
    .post((req, res) => {
        controller
            .createList(req.body.title)
            .then(data => {
                if (data.severity === 'ERROR') res.status(404).json({ error: 'Sorry, but something oops' })
                res.json(data)
            })
    })
    .delete((req, res) => {
        controller
            .removeListById(req.params.listId)
            .then(data => {
                if (data.severity === 'ERROR') res.status(404).json({ error: 'Sorry, but requested list was not found' })
                res.json(data)
            })
    });

router.use('/:listId/todos', todos);

export default router;
