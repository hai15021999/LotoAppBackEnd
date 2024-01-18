import { addGameBoardPlayer, updateGameBoardInfo } from '../../data/games.mjs';

const joinGame = async (playerName, gameId) => {
    const result = addGameBoardPlayer(gameId, playerName);
    return result;
}

const pickPaper = async (gameId, playerName, paperId) => {
    const result = updateGameBoardInfo(gameId, playerName, paperId);
    return result;
}

export {
    joinGame,
    pickPaper
}
