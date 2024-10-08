const connectToMongo = require("./config/db");
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { initializeHttpServer } = require("./servers/httpServer")
const { initializeWebSocket } = require("./servers/websocketServer");

const app = express();
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Define your routes
app.use("/app/users", require("./routes/students"));
app.use("/app/details", require("./routes/management"));
app.use("/app/teachers", require("./routes/teachers"));
app.use("/app/attendance", require("./routes/attendance"));

// Create HTTP server
const server = http.createServer(app);

// Initialize HTTP and WebSocket servers
initializeHttpServer(app);
initializeWebSocket(server);

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Student Management System Server listening on port ${port}`);
});
