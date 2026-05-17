import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io("http://localhost:3000", {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket"],
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
