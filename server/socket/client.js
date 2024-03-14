// website(client) -> API(update) -> socket client -> socket server -> emit -> clients
const socketClient = require("socket.io-client");
const PORT = process.env.PORT || 4000;
const socket = socketClient(`http://localhost:${PORT}`);

function emitEvent(event) {
  socket.emit("text", event);
}

module.exports = { emitEvent };
