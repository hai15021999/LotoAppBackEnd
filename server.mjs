import http from "node:http";
import { HTTP_PORT, HOSTNAME, NODE_ENV } from "./config/global.mjs";
// import { Logger } from './utils/logger/logger.mjs';
import { cleanUp } from "./clean-up.mjs";
import app from "./app.mjs";
import { Server } from "socket.io";

// HTTP SERVER
const httpServer = http.createServer(app);
const io = new Server(httpServer);
httpServer.once("listening", () => {
  // Logger.log('info', `Server listening at http://${HOSTNAME}:${HTTP_PORT} in ${NODE_ENV} environment`);
  console.log(
    `Server listening at http://${HOSTNAME}:${HTTP_PORT} in ${NODE_ENV} environment`
  );
});
httpServer.listen({ port: HTTP_PORT, hostname: HOSTNAME });

// CLEAN UP
[
  "exit",
  "SIGINT",
  "SIGUSR1",
  "SIGUSR2",
  "uncaughtException",
  "SIGTERM",
].forEach((eventType) => {
  process.on(eventType, (eventDetails) => {
    cleanUp.bind(null, eventType, eventDetails)();
  });
});

//SOCKET
io.on("connection", (socket) => {
  console.log("a user connected");
});
