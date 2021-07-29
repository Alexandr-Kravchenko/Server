import http from 'http';

function logRequest({ method, url }) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
}

const tasks = [{ name: 'Get tasks' }, { name: 'Create Task' }]

const server = http.createServer((req, res) => {
    logRequest(req);
    if (req.url === '/tasks') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(tasks));
        } else if (req.method === 'POST') {
            const data = [];
            req.on('data', chunk => data.push(chunk));
            req.on('end', () => {
                const task = JSON.parse(data.join(''));
                tasks.push(task);
                res.writeHead(201, { 'Content-Type': 'application/json' }).end(JSON.stringify(task));
            })
        } else {
            res.writeHead(404, 'Not Found').end()
        }
    } else {
        res.writeHead(404, 'Not Found').end()
    }
})
const port = 3000;

server.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
})

// curl localhost:3000/tasks -d '{"name": "Update task" }' -H "Content-Type: application/json"