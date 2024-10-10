const SOCKETIO = require("socket.io");

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

function initializeWebSocket(server) {
  const io = SOCKETIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A connection is established");

    socket.on("join-class", (data) => {
      const { emailId, classSection } = data;

      emailToSocketMapping.set(emailId, socket.id);
      socketToEmailMapping.set(socket.id, emailId);
      socket.join(classSection);

      socket.emit("joined-class", { classSection });

      try {
        socket.broadcast.to(classSection).emit("user-joined", { emailId });
      } catch (err) {
        console.log("Error broadcasting user-joined event: ", err);
      }
    });

    socket.on("call-user", (data) => {
      const { emailId, offer } = data;
      const fromEmail = socketToEmailMapping.get(socket.id);
      const socketId = emailToSocketMapping.get(emailId);

      if (socketId) {
        socket.to(socketId).emit("incoming-call", {
          fromEmail,
          offer,
        });
      }
    });

    socket.on("call-accepted", (data) => {
      const { fromEmail, answer } = data;
      const socketId = emailToSocketMapping.get(fromEmail);

      if (socketId) {
        socket.to(socketId).emit("call-accepted", { fromEmail, answer });
      }
    });

    // Handle ICE candidate exchange
    socket.on("ice-candidate", (data) => {
      const { toEmail, candidate } = data;
      const socketId = emailToSocketMapping.get(toEmail);

      if (socketId) {
        socket.to(socketId).emit("ice-candidate", candidate);
      }
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
      const emailId = socketToEmailMapping.get(socket.id);

      if (emailId) {
        emailToSocketMapping.delete(emailId);
        socketToEmailMapping.delete(socket.id);

        // Broadcast to others in the class that the user has disconnected
        socket.broadcast.emit("user-disconnected", { emailId });
      }
    });
  });
}

module.exports = { initializeWebSocket };
