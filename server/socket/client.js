// website(client) -> API(update) -> socket client -> socket server -> emit -> clients
const socketClient = require("socket.io-client");
const socket = socketClient("http://localhost:3001");

function emitEvent(event) {
  socket.emit("text", event);
}

module.exports = { emitEvent };
