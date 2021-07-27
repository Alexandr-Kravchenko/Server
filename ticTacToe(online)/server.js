#!/usr/bin/env node

const net = require('net');
const players = [];
const ticTacToe = require('./ticTacToe');

const gameField = ticTacToe.generateGameField();
const gameState = ticTacToe.createGameState();

const server = net.createServer((socket) => {
    socket.write('Welcome! to TicTacToe\nВведите play чтобы начать игру:\n');
    socket.setEncoding('utf8');
    const port = socket.remotePort;
    console.log('Player IP. Port: ', socket.remoteAddress);
    console.log('Player connected. Port: ', port);
    players.push(socket);
    let uid = players.indexOf(socket);
    ticTacToe.addPlayer(gameState, { socket: socket, uid: uid })

    if (players.length <= 2) {
        //socket.write(ticTacToe.drawField(gameField));

        /*         players.forEach(player => {
                    player.write('Для начала, введи свое имя: \n')
                    ticTacToe.setPlayerName('text', gameState, player);
                }) */

        socket.on('data', (message) => {
            let text = message.replace('\n', '').replace('\r', '');
            if (text.length > 0) {
                let name = ticTacToe.getPlayerName(socket, gameState);
                if (name !== undefined) {
                    let position = text.split(' ').slice(0, 2);
                    socket.write(name + ' твой символ: ' + ticTacToe.getPlayerSymbol(socket, gameState) + '\n');
                    ticTacToe.move(position, ticTacToe.getPlayerSymbol(socket, gameState), gameField, gameState, socket);
                    players.forEach(player => {
                        if (player.write !== socket) {
                            player.write('Твой черед: ' + ticTacToe.getPlayerName(player, gameState) + ' \n');
                        }
                        player.write(ticTacToe.drawField(gameField));
                    })
                } else if (text !== 'play'){
                    ticTacToe.setPlayerName(text, gameState, socket);
                } else {
                    socket.write('Для начала, введи свое имя: \n')
                }
            }
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

server.listen(1330, '0.0.0.0', () => { console.log('Listening on ', server.address().address) });