import Server   from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // JSON-serialized snapshot of the state whenever the state changes.
  store.subscribe(
    ( => io.emit('state', store.getState.toJS()))
  );

  io.on('connection', (socket) => {
    // Clients will immediately receive current state on connection.
    socket.emit('state', store.getState.toJS());

    // Receive updates (votes) from clients.
    socket.on('action', store.dispatch.bind(store));
  });



}