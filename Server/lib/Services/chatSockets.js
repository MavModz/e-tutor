module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User Disconnected');
        });

        socket.on('sendMessage', (message) => {
            console.log('Recived Message', message);
            socket.broadcast.emit('reciveMessage', message);
        });
    })
}