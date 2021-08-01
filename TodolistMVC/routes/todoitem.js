import express from 'express';
import controller from '../controllers/TodolistController.js';

const router = express.Router({mergeParams: true});

router.get('/:todoId', (req, res) => {
    const id = parseInt(req.params.todoId)
    const listId = req.params.listId
    //const listId = parseInt(req.params.listId)
    res.json(`id: ${id} + listId: ${listId}`)
})

export default router;