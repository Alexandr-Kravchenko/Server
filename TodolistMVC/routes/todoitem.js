import express from 'express';
import controller from '../controllers/TodoitemController.js';

const router = express.Router()

router.get('/', function(req, res) {
    res.json(controller.find())
})

router.get('/:id', (req, res) => {
    let todo = controller.findById(req.params.id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Sorry, but requested todo was not found' })
    }
});

router.post('/', (req, res) => {
    res.status(201).json(controller.create(req.body.title));
});

router.patch('/:id', (req, res) => {
    let todo = controller.updateById(req.params.id, req.body);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Sorry, but requested todo was not found' })
    }
});

export default router;
