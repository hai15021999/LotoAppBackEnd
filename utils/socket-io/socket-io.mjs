import { Server } from "socket.io";
// import { instrument } from "@socket.io/admin-ui";

let SocketServer = null;

let SocketClients = null;

const createSocketServer = (server, transports = ["websocket", "polling"]) => {
  SocketServer = new Server(server, {
    transports: transports,
  });
  SocketClients = new Map();
};

const emitData = (key, data) => {
  return SocketServer.emit(key, data);
};

export { createSocketServer, SocketServer, SocketClients, emitData };
