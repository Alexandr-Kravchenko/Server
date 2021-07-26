#!/usr/bin/env node

const net = require('net');
const clients = [];

const server = net.createServer((socket) => {
    socket.write('Server is on!\n');
    const port = socket.remotePort;
    console.log('Client IP. Port: ', socket.remoteAddress);
    console.log('Client connected. Port: ', port);

    socket.on('data', (messsage) => {
        clients.forEach(client => {
			if (client !== socket) {
				//client.write(message);
			}
		})
    })

    socket.on('close', () => {
        let index = clients.indexOf(socket);
        clients.splice(index, 1);
        console.log('Closed', port);
    })
    clients.push(socket);

    //socket.pipe(process.stdout);
    
});

server.listen(1330, '127.0.0.1', () => {console.log('Listening on ', server.address().address)});
