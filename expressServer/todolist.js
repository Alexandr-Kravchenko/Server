import express from 'express';
const app = express();

// app.use(express.json());

const middleware = function (req, _, next) {
    if(req.method !== 'GET' && req.method !== 'DELETE' && req.is('application/json')) {
        const data = [];
        req.on('data', chunk => {
            data.push(chunk.toString())
        })
        req.on('end', () => {
            req.body = {};
            data.forEach(element => {
                req.body = Object.assign(req.body, JSON.parse(element));
            });
            next();
        })
    } else {
        next();
    }
}

app.use(middleware);

app.post('/', (req, res) => {
    res.json(req.body)
});

app.get('/', (req, res) => {
    res.json(req.body)
});


/* const inc = (init = 0) => () => ++init

const genId = inc();

const todolist = [];

const createTodo = data => {
    return {
        id: genId(),
        title: data.title,
        done: false
    }
}
 */

/* app.get('/api/todoitem', (req, res) => {
    res.json(todolist);
}); 

app.get('/api/todoitem/:id', (req, res) => {
    res.json(todolist[req.params.id - 1]);
});

app.post('/api/todoitem', (req, res) => {
    const todo = createTodo(req.body);
    todolist.push(todo);
    res.status(201).json(todo);
});

app.patch('/api/todoitem/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todolist.find(t => t.id === todoId);
    if (todo) {
        Object.assign(todo, req.body);
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Sorry, but requested todo was not found' })
    }
});

app.use('/*', (req, res) => {
    res.status(404).json({ error: 'Sorry, but the page with requested url is not exist' })
})
 */
const port = 3000;

app.listen(port, () => {
    console.log(`Server started at localhost: ${port}`)
})
