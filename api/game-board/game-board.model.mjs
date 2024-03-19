import { generateUUID, getRandomNumer } from '../../utils/functions/common.mjs';
import { getGameBoard, createGameBoard, getGameBoards, updateGameBoardStatus, updateGameBoardRecord, onFinishGame } from '../../data/games.mjs';
import { emitData } from '../../utils/socket-io/socket-io.mjs'

const getNewGameBoardId = async () => {
    const newGameId = generateUUID();
    const result = createGameBoard(newGameId);
    return result.gameCode;
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

const startGameBoard = async (req) => {
    const { gameId } = req.body;
    const result = updateGameBoardStatus(gameId, 'playing');
    emitData(`${gameId}`, getGameBoard(gameId));
    return result;
}

const getNumber = async (req) => {
    const { gameId } = req.body;
    const gameInfo = getGameBoard(gameId);
    const nextResult = getRandomNumer(gameInfo.box);
    const result = updateGameBoardRecord(gameId, nextResult.number, nextResult.box);
    emitData(`${gameId}`, getGameBoard(gameId));
    emitData(`${gameId}_generate_number`, newNumber);
    return result;
}

const onFinishGameBoard = async (req) => {
    const { gameId } = req.body;
    const result = onFinishGame(gameId);
    emitData(`${gameId}`, getGameBoard(gameId));
    return result;
}

export {
    getNewGameBoardId,
    getGameById,
    getAllGameBoards,
    startGameBoard,
    getNumber,
    onFinishGameBoard
}
