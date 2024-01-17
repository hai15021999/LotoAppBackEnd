import express from 'express';
import path from 'node:path';
import { GameBoardRouter } from './api/game-board/game-board.controller.mjs'
const __dirname = path.resolve();

const app = express();

app.use(express.static(__dirname + '/public'));

app.use('/api/v1/game-board', GameBoardRouter);
app.use('/', (req, res) => {
    // Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 404`);
    res.status(404).json({ message: 'Not found' });
});

export default app;