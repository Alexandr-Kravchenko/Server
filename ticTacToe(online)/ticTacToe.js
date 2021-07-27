
function generateGameField() {
    return [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
}

function createGameState() {
    return {
        play: true,
        turn: 'x',
        players: []
    }
}

function addPlayer(state, player) {
    return state.players.push(player);
}

function getGameStatus(state) {
    return state.play;
}

function drawField(field) {
    let result = [];
    for (let i = 0; i < field.length; i += 1) {
        result.push(field[i].join('|'))
    }
    return result.join('\n') + '\n';
}

function isXO(symbol) {
    return symbol === 'x' || symbol === 'o';
}

function isCorrectPos(pos) {
    return pos[0] >= 0 && pos[0] <= 2 && pos[1] >= 0 && pos[1] <= 2;
}

function setTurn(symbol, gameState) {
    return gameState.turn = symbol === 'x' ? 'o' : 'x';
}

function setPlayerName(name, state, socket) {
    let index = state.players.find(player => player.socket === socket).uid;
    state.players[index].name = name;
}

function getPlayerName(socket, state) {
    let index = state.players.find(player => player.socket === socket).uid;
    return state.players[index].name;
}

function getPlayerSymbol(socket, state) {
    let index = state.players.find(player => player.socket === socket).uid;
    let turn = (index + 1) % 2;

    return turn === 1 ? 'x' : 'o';
}

function isCorrectTurn(symbol, state) {
    return state.turn === symbol;
}

function move(pos, symbol, field, state, socket) {
    if (getGameStatus(state)) {
        if (isXO(symbol) && isCorrectPos(pos)) {
            if (!checkField(field)) {
                toggleGame(state);
            } else {
                if (isCorrectTurn(getPlayerSymbol(socket, state), state)) {
                    if (isFree(field[pos[0]][[pos[1]]])) {
                        field[pos[0]][[pos[1]]] = symbol;
                        setTurn(symbol, state);
                    } else {
                        socket.write('Клетка занята\n');
                    }
                } else {
                    socket.write('Не твой ход\n');
                }
                socket.write(drawField(field));
                return socket.write(checkVictory(field, symbol, state));
            }
        } else {
            //socket.write(drawField(field));
            return 'Или не тем ходишь, или далеко хочешь\n';
        }
    } else {
        return socket.write('Игра остановлена. Ход невозможен\n');
    }
}

function checkVictory(field, symbol, state, socket) {
    if (field[0][0] === symbol && field[0][1] === symbol && field[0][2] === symbol) {
        toggleGame(state);
        return socket.write(`${symbol} Победил!\n`)
    }
    if (field[1][0] === symbol && field[1][1] === symbol && field[1][2] === symbol) {
        toggleGame(state);
        return socket.write(`${symbol} Победил!\n`)
    }
    if (field[2][0] === symbol && field[2][1] === symbol && field[2][2] === symbol) {
        toggleGame(state);
        return socket.write(`${symbol} Победил!\n`)
    }

    if (field[0][0] === symbol && field[1][0] === symbol && field[2][0] === symbol) {
        toggleGame(state);
        return socket.write(`${symbol} Победил!\n`)
    }
    if (field[0][1] === symbol && field[1][1] === symbol && field[2][1] === symbol) {
        toggleGame(state);
        return socket.write(`${symbol} Победил!\n`)
    }
    if (field[0][2] === symbol && field[1][2] === symbol && field[2][2] === symbol) {
        toggleGame(state);
        return socket.write(`${symbol} Победил!\n`)
    }

    if (field[0][0] === symbol && field[1][1] === symbol && field[2][2] === symbol) {
        toggleGame(state);
        return socket.write(`${symbol} Победил!\n`)
    }
    if (field[0][2] === symbol && field[1][1] === symbol && field[2][0] === symbol) {
        toggleGame(state);
        return socket.write(`${symbol} Победил!\n`)
    }
    if (!checkField(field)) {
        toggleGame(state);
        return socket.write('Ничья\n')
    }
    return `А теперь Подожди)!\n`
}

function checkField(field) {
    let result = [];
    for (let i = 0; i < field.length; i += 1) {
        result.push(field[i].some(isFree));
    }
    return result.some((bool) => bool === true);
}

function isFree(pos) {
    return pos === " ";
}

function toggleGame(state) {
    return state.play = !state.play;
}

module.exports.getGameStatus = getGameStatus;
module.exports.createGameState = createGameState;
module.exports.generateGameField = generateGameField;
module.exports.drawField = drawField;
module.exports.checkField = checkField;
module.exports.checkVictory = checkVictory;
module.exports.move = move;
module.exports.setTurn = setTurn;
module.exports.toggleGame = toggleGame;
module.exports.isFree = isFree;
module.exports.isXO = isXO;
module.exports.isCorrectPos = isCorrectPos;
module.exports.isCorrectTurn = isCorrectTurn;
module.exports.addPlayer = addPlayer;
module.exports.getPlayerSymbol = getPlayerSymbol;
module.exports.setPlayerName = setPlayerName;
module.exports.getPlayerName = getPlayerName;
