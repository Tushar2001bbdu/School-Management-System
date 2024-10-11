const connectToMongo = require("./config/db");
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { initializeHttpServer } = require("./servers/httpServer");
const { initializeWebSocket } = require("./servers/websocketServer");
const { ExpressPeerServer } = require('peer');

const app = express();
connectToMongo();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Define your routes
app.use("/app/users", require("./routes/students"));
app.use("/app/details", require("./routes/management"));
app.use("/app/teachers", require("./routes/teachers"));
app.use("/app/attendance", require("./routes/attendance"));

// Create HTTP server for the main application
const server = http.createServer(app);

// Create a separate HTTP server for PeerJS
const peerPort = 3002; // Use a different port for PeerJS
const peerServerInstance = http.createServer();
const peerServer = ExpressPeerServer(peerServerInstance, { debug: true, path: '/peerjs' });

// Use PeerJS middleware on Express
app.use('/peerjs', peerServer);

// Initialize HTTP and WebSocket servers
initializeHttpServer(app);
initializeWebSocket(server);

// Start the main server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Student Management System Server listening on port ${port}`);
});

// Start the PeerJS server
peerServerInstance.listen(peerPort, () => {
  console.log(`PeerJS Server listening on port ${peerPort}`);
});
