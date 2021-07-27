#!/usr/bin/env node
const net = require('net');
const ticTacToe = require('./ticTacToe');

const players = [];
const gameField = ticTacToe.generateGameField();
const gameState = ticTacToe.createGameState();

const server = net.createServer((socket) => {
    socket.write('Welcome! to TicTacToe\nВведите своё имя:\n');
    socket.setEncoding('utf8');
    console.log(`Player ${socket.remoteAddress}:${socket.remotePort}`);

    players.push(socket);

    let uid = players.indexOf(socket);
    ticTacToe.addPlayer(gameState, { socket: socket, uid: uid });

    if (players.length <= 2) {
        socket.on('data', (message) => {
            if (ticTacToe.getGameStatus(gameState)) {
                let text = message.replace('\n', '').replace('\r', '');
                if (text.length > 0) {
                    let name = ticTacToe.getPlayerName(socket, gameState);
                    let symbol = ticTacToe.getPlayerSymbol(socket, gameState);
                    if (name !== undefined) {
                        if (players.length === 2) {
                            let position = text.split(' ').slice(0, 2);
                            socket.write(ticTacToe.move(position, symbol, gameField, gameState, socket));
                            players.forEach(player => {
                                if (player !== socket) {
                                    player.write(`Твой черед: ${ticTacToe.getPlayerName(player, gameState)}\n`);
                                } else {
                                    player.write('А теперь подожди!\n');
                                }
                                player.write(ticTacToe.drawField(gameField));
                                player.write(ticTacToe.checkVictory(gameField, symbol, gameState, name));
                            })
                        } else {
                            socket.write('Ожидаем второго игрока\n');
                        }
                    } else {
                        ticTacToe.setPlayerName(text, gameState, socket);
                        if (symbol === 'x') {
                            socket.write(`${text} ты '${symbol}' ходишь первым \n`);
                        } else {
                            socket.write(`${text} ты '${symbol}' ожидай хода первого игрока\n`);
                        }
                        socket.write(ticTacToe.drawField(gameField));
                    }
                }
            } else {
                socket.write('А уже все, игра закончена, я тебя удаляю\n');
                socket.destroy();
            }
        });
        socket.on('close', () => {
            players.splice(uid, 1);
            console.log('Игрок покинул нас...', socket.remoteAddress + ':' + socket.remotePort);
        })
    } else {
        socket.write('Походу занято, сорян\n');
        socket.destroy();
    }
});

server.listen(1330, '127.0.0.1', () => { console.log('Listening on ', server.address().address) });
