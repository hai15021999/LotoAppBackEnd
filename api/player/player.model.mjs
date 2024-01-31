import { addGameBoardPlayer, updatePlayerPaper, getGameBoard, verifyBingo, updateGameBoardWinner } from '../../data/games.mjs';
import { emitData } from '../../utils/socket-io/socket-io.mjs'

const joinGame = async (playerName, gameId) => {
    const result = addGameBoardPlayer(gameId, playerName);
    emitData(`${gameId}`, getGameBoard(gameId));
    return result;
}

const pickPaper = async (gameId, playerName, paperId) => {
    const result = updatePlayerPaper(gameId, playerName, paperId);
    if (result?.status === 'success') {
        emitData(`${gameId}`, getGameBoard(gameId));
    }
    return result;
}

const notifyWaitingBingo = async (gameId, playerName) => {
    const result = getGameBoard(gameId);
    result['waitingPlayer'] = playerName;
    emitData(`${gameId}`, result);
    return {
        status: 'success'
    };
}

const notifyBingo = async (gameId, playerName, paperId, rowBingo) => {
    const verify = verifyBingo(gameId, playerName, paperId, rowBingo);
    if (verify) {
        const result = updateGameBoardWinner(gameId, playerName);
        const winners = getGameBoard(gameId).winner;
        emitData(`${gameId}_winner`, winners);
        return {
            status: 'success'
        }
    } else {
        return {
            status: 'fail',
            message: 'Kinh hụt'
        }
    }
}

export {
    joinGame,
    pickPaper,
    notifyWaitingBingo,
    notifyBingo
}
