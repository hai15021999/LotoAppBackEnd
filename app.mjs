import express from "express";
import path from "node:path";
import { GameBoardRouter } from "./api/game-board/game-board.controller.mjs";
import { PlayerRouter } from "./api/player/player.controller.mjs";
import { PingRouter } from "./api/ping/ping.controller.mjs";
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

const __dirname = path.resolve();

process.on('uncaughtException', function (err) {
  console.log(err);
})

const app = express();

const MAX_REQUEST_BODY_SIZE = "50mb";

app.use(express.json({ limit: MAX_REQUEST_BODY_SIZE }));
app.use(express.raw({ limit: MAX_REQUEST_BODY_SIZE }));
app.use(express.text({ limit: MAX_REQUEST_BODY_SIZE }));
app.use(express.urlencoded({ limit: MAX_REQUEST_BODY_SIZE, extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(helmet());
app.use(cors());
app.use(compression());

app.use("/api/v1/game-board", GameBoardRouter);
app.use("/api/v1/player", PlayerRouter);
app.use('/api/v1/ping', PingRouter);
app.use("/", (req, res) => {
  // Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 404`);
  res.status(404).json({ message: "Not found" });
});

export default app;
