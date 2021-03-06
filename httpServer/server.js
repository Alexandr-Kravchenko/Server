import http from 'http';
import url from 'url';
import pl from './plural.js';
import wordFrequency from './wordFrequency.js';

function mapToObject(map) {
    const obj = {};
    for (const [key, value] of map)
        obj[key] = value;
    return obj;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.url === '/headers') {
        res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(req.headers))

    } else if (parsedUrl.pathname === '/plural') {
        let query = parsedUrl.query;
        let forms = query.forms.split(',')
        let result = pl(query.number, forms[0], forms[1], forms[2]);
        res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(result));

    } else if (req.url === '/frequency') {
        if (req.method === 'POST') {
            let data = [];
            req.on('data', chunk => data.push(chunk.toString()));
            req.on('end', () => {
                let result = data.join('')
                res.writeHead(201, { 'Content-Type': 'application/json' }).end(JSON.stringify(mapToObject(wordFrequency(result))))
            });
        } else {
            res.writeHead(404, 'Not Found').end();
        }
    } else {
        res.writeHead(404, 'Not Found').end();
    }
})

const port = 3000;

server.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
})

// curl localhost:3000/headers

// curl 'localhost:3000/plural?number=2&forms=person,people,people'

// curl -X POST localhost:3000/frequency --data-raw "Little red fox jumps over logs. Fox is red"