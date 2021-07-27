#!/usr/bin/env node

const net = require('net');
const players = [];
const ticTacToe = require('./ticTacToe');

const gameField = ticTacToe.generateGameField();
const gameState = ticTacToe.createGameState();

const server = net.createServer((socket) => {
    socket.write('Welcome! to TicTacToe\n');
    socket.setEncoding('utf8');
    const port = socket.remotePort;
    console.log('Client IP. Port: ', socket.remoteAddress);
    console.log('Client connected. Port: ', port);
    players.push(socket);
    let uid = players.indexOf(socket);
    ticTacToe.addPlayer(gameState, {socket: socket, uid: uid})
    console.log(players.indexOf(socket))
    socket.write('Твой символ: ' + ticTacToe.getPlayerSymbol(socket, gameState) + '\n');


    if(players.length <= 2) { 
        socket.write(ticTacToe.drawField(gameField));
        socket.on('data', (message) => {
            let text = message.replace('\n', '')
            let payload = text.split(' ');
            let position = payload.slice(0,2);
            ticTacToe.move(position, ticTacToe.getPlayerSymbol(socket, gameState), gameField, gameState, socket);
            players.forEach(player => {
                if (player.write !== socket) {
                    player.write('Твой черед: ' + ticTacToe.getPlayerSymbol(player, gameState) + ' \n');
                }
                player.write(ticTacToe.drawField(gameField));
            })
        });
        socket.on('close', () => {
            //let index = players.indexOf(socket);
            players.splice(uid, 1);
            console.log('Игрок покинул нас...', socket.remoteAddress + ':' + port);
        })
    } else {
        socket.write('Походу занято, сорян')
        socket.destroy();
    }
});

server.listen(1330, '0.0.0.0', () => {console.log('Listening on ', server.address().address)});
