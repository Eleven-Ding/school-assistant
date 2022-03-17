import io from "socket.io-client";

class ConnectionSocket {
  constructor() {
    this.socket = {};
  }
  createConnect() {
    this.socket = io("ws://localhost:3001");
  }
  emit(type, data) {
    this.socket.emit(type, JSON.stringify(data));
  }
  listen(type, cb) {
    this.socket.on(type, cb);
  }
}

export default new ConnectionSocket();
