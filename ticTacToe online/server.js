#!/usr/bin/env node

const net = require('net');
const clients = [];
const ticTacToe = require('./ticTacToe');

const gameField = ticTacToe.generateGameField();
const gameState = ticTacToe.createGameState();

const server = net.createServer((socket) => {

    if(clients.length < 2) { 
        socket.write('Welcome! to TicTacToe\n');
        socket.setEncoding('utf8');
        const port = socket.remotePort;
        console.log('Client IP. Port: ', socket.remoteAddress);
        console.log('Client connected. Port: ', port);


        socket.write(ticTacToe.drawField(gameField));
        socket.on('data', (message) => {
            let index = clients.indexOf(socket);

            clients.forEach(client => {
                if (client !== socket) {
                    client.write(ticTacToe.drawField(gameField));
                }
            })

            let text = message.replace('\n', '')
            let position = text.split(' ');
            console.log(text)
            ticTacToe.move(position, 'x', gameField, gameState)
            socket.write(ticTacToe.drawField(gameField));
        });

        socket.on('close', () => {
            let index = clients.indexOf(socket);
            clients.splice(index, 1);
            console.log('Closed', port);
        })
        clients.push(socket);
    } else {
        socket.write('Походу занято, сорян')
        socket.destroy();
    }
});

server.listen(1330, '127.0.0.1', () => {console.log('Listening on ', server.address().address)});
