#!/usr/bin/env node
import net from 'net';
import {
    getGameStatus, createGameState, generateGameField, drawField, checkField,
    checkVictory, move, setTurn, toggleGame, isFree, isXO, isCorrectPos, isCorrectTurn, addPlayer, getPlayerSymbol,
    setPlayerName, getPlayerName, getPlayers, resetField, resetState
} from './ticTacToe.js';

const players = [];
const gameField = generateGameField();
const gameState = createGameState();

const server = net.createServer((socket) => {
    console.log(`Player ${socket.remoteAddress}:${socket.remotePort}`);
    players.push(socket);

    socket.setEncoding('utf8');

    socket.write('Welcome! to TicTacToe\nВведите своё имя:\n');


    let uid = players.indexOf(socket);
    addPlayer(gameState, { socket: socket, uid: uid });

    if (players.length <= 2) {
        socket.on('data', (message) => {
            if (getGameStatus(gameState)) {
                let text = message.replace('\n', '').replace('\r', '');
                if (text.length > 0) {
                    let symbol = getPlayerSymbol(socket, gameState);

                    let isExistUnnamedPlayer = getPlayers(gameState).some(player => player.name === undefined);
                    if (isExistUnnamedPlayer) {
                        if (getPlayerName(socket, gameState) === undefined) {
                            setPlayerName(text, gameState, socket);
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
                            socket.write(drawField(gameField));
                        } else {
                            socket.write('Подожди, пока второй игрок представится\n')
                        }
                    } else {
                        if (players.length === 2) {
                            let position = text.split(' ').slice(0, 2);
                            if (move(position, symbol, gameField, gameState, socket)) {
                                players.forEach(player => {
                                    player.write(drawField(gameField));
                                    player.write(checkVictory(gameField, symbol, gameState, getPlayerName(socket, gameState)));
                                    if (player !== socket && getGameStatus(gameState)) {
                                        let name = getPlayerName(player, gameState);
                                        player.write(`Твой черед, ${name}\n`);
                                        socket.write(`А теперь подожди, ${name} думает что и куда\n`);
                                    }
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
