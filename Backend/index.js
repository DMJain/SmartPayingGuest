const http = require('http');
const expressApplication = require('./app');
const connectDB = require('./models');
const { Server } = require("socket.io");
const Chat = require('./models/chatRoom.model');

const PORT = process.env.PORT ?? 8000;

async function init() {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log(`Mongodb Connected`);

    const server = http.createServer(expressApplication);

    const io = new Server(server, {
        cors: {origin : '*', methods: ['GET', 'POST']},
    });  

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('join-room', (roomId) => {
            socket.join(roomId);
            console.log('user', socket.id,'joined room', roomId);
        })

        socket.on('recieve-message', (data) => {
            console.log('message: ' + data.message);
            io.to(data.roomId).emit('message', {message :data.message, sender: data.sender});
        });
    });

    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(`Error   
 starting server`, err);
    process.exit(1);
  }
}

init();