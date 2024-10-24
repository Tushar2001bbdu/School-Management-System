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


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/app/users", require("./routes/students"));
app.use("/app/details", require("./routes/management"));
app.use("/app/teachers", require("./routes/teachers"));
app.use("/app/attendance", require("./routes/attendance"));
app.use("/app/onlineClass", require("./routes/onlineclass"));


const server = http.createServer(app);


const peerPort = 3002; 
const peerServerInstance = http.createServer();
const peerServer = ExpressPeerServer(peerServerInstance, { debug: true, path: '/peerjs' });


app.use('/peerjs', peerServer);


initializeHttpServer(app);
initializeWebSocket(server);


const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Student Management System Server listening on port ${port}`);
});


peerServerInstance.listen(peerPort, () => {
  console.log(`PeerJS Server listening on port ${peerPort}`);
});
