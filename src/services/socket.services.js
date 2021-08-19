import BASE_URL from "../constants/baseURL.constants";

let socket;

export const initiateSocket = () => {
  socket = new WebSocket(BASE_URL);
};

export const subscribe = (param) => {
  if (!socket) {
    initiateSocket();
  }

  socket.onmessage = (event) => {
    return param(JSON.parse(event.data));
  };
};
