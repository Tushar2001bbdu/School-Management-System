const SOCKETIO = require("socket.io");

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

function initializeWebSocket(server) {
  const io = SOCKETIO(server, {
    cors: {
      origin: "http://localhost:3000",  // React frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.on('join-room', (roomId, userId) => {
      console.log(`User ${userId} joined room ${roomId}`);
      
      socket.join(roomId);

      // Notify others in the room that a new user has connected
      socket.to(roomId).emit('user-connected', userId);

      // Handle user disconnection
      socket.on('disconnect', () => {
        console.log(`User ${userId} disconnected`);
        socket.to(roomId).emit('user-disconnected', userId);
      });
    });
  });
}

module.exports = { initializeWebSocket };
