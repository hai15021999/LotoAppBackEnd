import express from 'express';
import { resJSON } from '../../utils/request/request.mjs';

const router = express.Router();
router
    .get('/', async (req, res) => {
        resJSON(req, res, 200, true);
    });

export { router as PingRouter }
