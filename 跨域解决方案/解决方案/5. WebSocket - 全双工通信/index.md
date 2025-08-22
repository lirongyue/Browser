```js

const socket = new WebSocket('wss://api.example.com');

socket.onopen = () => {
  socket.send(JSON.stringify({ action: 'subscribe' }));
};

socket.onmessage = (event) => {
  console.log('收到数据:', JSON.parse(event.data));
};