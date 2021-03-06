import express from 'express';
import controller from '../../controllers/ListController.js';
import todos from './todos.js';

const router = express.Router()

router.route('/:listId?')
    .get((req, res) => {
        if (req.params.listId) {
            controller
                .findListById(+req.params.listId)
                .then(data => {
                    if (data.length === 0) {
                        res.status(404).json({ error: 'Sorry, but requested list was not found' })
                    } else {
                        res.json(data)
                    }
                })
        } else {
            controller
                .findAllLists()
                .then(data => {
                    res.json(data)
                })
        }
    })
    .post((req, res) => {
        controller
            .createList(req.body.title)
            .then(data => {
                res.json({ status: 'List created' })
            })
    })
    .delete((req, res) => {
        controller
            .removeListById(req.params.listId)
            .then(data => {
                if (data === '0') {
                    res.status(404).json({ error: 'Sorry, but requested list was not found' })
                } else {
                    res.json({ status: 'List deleted' });
                }
            })
    });

router.use('/:listId/todos', todos);

export default router;
