const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;

const tasks = [
    { id: 1, name: 'WakeUP' },
    { id: 2, name: 'Survive' }
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json(task);
});

app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        Object.assign(task, req.body);
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' })
    }
});



app.listen(port, () => {
    console.log(`Server started at localhost: ${port}`)
})