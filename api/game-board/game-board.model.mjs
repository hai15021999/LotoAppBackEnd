import { generateUUID } from '../../utils/functions/common.mjs';
import { getGameBoard, createGameBoard, getGameBoards } from '../../data/games.mjs';

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

const getAllGameBoards = async () => {
    const result = getGameBoards();
    return result;
}


export {
    getNewGameBoardId,
    getGameById,
    getAllGameBoards
}
