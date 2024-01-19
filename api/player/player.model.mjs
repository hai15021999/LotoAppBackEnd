import { addGameBoardPlayer, updatePlayerPaper, getGameBoard } from '../../data/games.mjs';
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

export {
    joinGame,
    pickPaper
}
