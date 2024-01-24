import http from "node:http";
import https from "node:https";
import { HTTP_PORT, HOSTNAME, NODE_ENV } from "./config/global.mjs";
import { Logger } from './utils/logger/logger.mjs';
import { cleanUp } from "./clean-up.mjs";
import app from "./app.mjs";
import { SocketServer, SocketClients, createSocketServer } from './utils/socket-io/socket-io.mjs';

// HTTPS SERVER
const httpsServer = https.createServer(app);

//Socket
createSocketServer(httpsServer);
SocketServer.on('connection', socket => {
  Logger.log('info', `New Socket Client connected with id ${socket.id}`);
  SocketClients.set(socket.id, socket);
  socket.on('disconnect', () => {
    SocketClients.delete(socket.id);
    Logger.log('info', `Socket Client with id ${socket.id} disconnected`);
  });
});

httpsServer.once("listening", () => {
  Logger.log('info', `Server listening at https://${HOSTNAME}:${HTTP_PORT}`);
  console.log(
    `Server listening at https://${HOSTNAME}:${HTTP_PORT}`
  );
});
httpsServer.listen({ port: HTTP_PORT, hostname: HOSTNAME });



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
