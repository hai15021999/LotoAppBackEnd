import { generateUUID } from '../../utils/functions/common.mjs';
import { getGameBoard, createGameBoard } from '../../data/games.mjs';

const getNewGameBoardId = async () => {
    const newGameId = generateUUID();
    createGameBoard(newGameId);
    return newGameId;
}

const getGameById = async (req) => {
    const gameId = req.params.id;
    const result = getGameBoard(gameId);
    return result;
}

export {
    getNewGameBoardId,
    getGameById,
}
