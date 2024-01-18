import express from "express";
import path from "node:path";
import { GameBoardRouter } from "./api/game-board/game-board.controller.mjs";
import { PlayerRouter } from "./api/player/player.controller.mjs";
import { Server } from "socket.io";

const __dirname = path.resolve();

const app = express();
const io = new Server(server);

const MAX_REQUEST_BODY_SIZE = "50mb";

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.use(express.json({ limit: MAX_REQUEST_BODY_SIZE }));
app.use(express.raw({ limit: MAX_REQUEST_BODY_SIZE }));
app.use(express.text({ limit: MAX_REQUEST_BODY_SIZE }));
app.use(express.urlencoded({ limit: MAX_REQUEST_BODY_SIZE, extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/api/v1/game-board", GameBoardRouter);
app.use("/api/v1/player", PlayerRouter);
app.use('/api/v1/ping', PingRouter);
app.use("/", (req, res) => {
  // Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 404`);
  res.status(404).json({ message: "Not found" });
});

export default app;
