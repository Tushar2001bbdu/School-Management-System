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
    console.log("My connection is established");

    socket.on("join-class", (data) => {
      let { emailId, classSection } = data;

      emailToSocketMapping.set(emailId, socket.id);
      socketToEmailMapping.set(socket.id, emailId);
      socket.join(classSection);
      socket.emit("joined-class", { classSection });

      try {
        socket.broadcast.to(classSection).emit("user-joined", { emailId });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("call-user", (data) => {
      const { emailId, offer } = data;

      const fromEmail = socketToEmailMapping.get(socket.id);
      const socketId = emailToSocketMapping.get(emailId);
      socket.to(socketId).emit("incoming-call", {
        fromEmail,
        offer,
      });
    });

    socket.on("call-accepted", (data) => {
      const { fromEmail, answer } = data;
      const socketId = emailToSocketMapping.get(fromEmail);
      socket.to(socketId).emit("call-accepted", { fromEmail, answer });
    });
  });
}

module.exports = { initializeWebSocket };
