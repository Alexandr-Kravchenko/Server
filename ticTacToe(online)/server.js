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
                    let symbol = ticTacToe.getPlayerSymbol(socket, gameState);
                    let isExistUnnamedPlayer = ticTacToe.getPlayers(gameState).some(player => player.name === undefined);
                    if (isExistUnnamedPlayer) {
                        if (ticTacToe.getPlayerName(socket, gameState) === undefined) {
                            ticTacToe.setPlayerName(text, gameState, socket);
                            players.forEach(player => {
                                if (player !== socket) {
                                    player.write(`${text} присоединился\n`);
                                }
                            })
                            if (symbol === 'x') {
                                socket.write(`${text} ты '${symbol}' ходишь первым \n`);
                            } else {
                                socket.write(`${text} ты '${symbol}' ожидай хода первого игрока\n`);
                            }
                            socket.write(ticTacToe.drawField(gameField));
                        } else {
                            socket.write('Подожди, пока второй игрок представится\n')
                        }
                    } else {
                        if (players.length === 2) {
                            let position = text.split(' ').slice(0, 2);
                            if (ticTacToe.move(position, symbol, gameField, gameState, socket)) {
                                players.forEach(player => {
                                    if (player !== socket) {
                                        let name = ticTacToe.getPlayerName(player, gameState);
                                        player.write(`Твой черед: ${name}\n`);
                                        if (ticTacToe.getGameStatus(gameState)) socket.write(`А теперь подожди, ${name} думает что и куда\n`);
                                    }
                                    player.write(ticTacToe.drawField(gameField));
                                    player.write(ticTacToe.checkVictory(gameField, symbol, gameState, ticTacToe.getPlayerName(socket, gameState)));
                                })
                            }
                        } else {
                            socket.write('Ожидаем второго игрока\n');
                        }
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
        players.splice(uid, 1);
        socket.destroy();
    }
});

server.listen(1330, '0.0.0.0', () => { console.log('Listening on ', server.address().address) });
