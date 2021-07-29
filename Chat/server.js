import net from 'net';

const clients = new Map();

const server = net.createServer((socket) => {
    socket.setEncoding('utf-8')

    socket.write('Привет! Представся пожалуйста\n')

    socket.on('data', (text) => {
        let message = text.replace('\n', '');
        if(!clients.has(socket)) {            
            clients.set(socket, message);
        } else {
            let name = clients.get(socket);

            for(let client of clients.keys()) {
                if(client !== socket) {
                    client.write(`${name}: ${message}\n`);
                }
            }
        }
    })

});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server started on ' + server.address().address)
})