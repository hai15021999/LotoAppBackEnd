import express from 'express';
import { getNewGameBoardId } from './game-board.model.mjs';
import { resJSON } from '../../utils/request/request.mjs';

const router = express.Router();

router
    .post('/newGame', async (req, res) => {
        const result = await getNewGameBoardId();
        if (result) {
            resJSON(req, res, 200, result);
        } else {
            resJSON(req, res, 400, {
                message: 'Cannot generate new game.'
            });
        }
    });

export { router as GameBoardRouter }
