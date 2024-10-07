const connectToMongo = require("./db");
const express = require("express");
const http = require("http"); // Add this for HTTP server
const app = express();
const admin = require("firebase-admin");
const SOCKETIO = require('socket.io');

// Create HTTP server for Express and Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = SOCKETIO(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Firebase Initialization for students and teachers
const credentials = require("./Student-Account-Key.json");
if (admin.apps.length === 0) {
  admin.initializeApp(
    {
      credential: admin.credential.cert(credentials),
    },
    "students"
  );
}

if (admin.apps.length === 1) {
  const credentialsOfTeachers = require("./Teacher-Account-Key.json");
  admin.initializeApp(
    {
      credential: admin.credential.cert(credentialsOfTeachers),
    },
    "teachers"
  );
}

connectToMongo();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.raw());
app.use(bodyParser.json());
app.use(cookieParser());

// Define your routes
app.use("/app/users", require("./routes/students"));
app.use("/app/details", require("./routes/management"));
app.use("/app/teachers", require("./routes/teachers"));
app.use("/app/attendance", require("./routes/attendance"));
const emailToSocketMaping=new Map()
const socketToEmailMaping=new Map()
// Use Socket.IO for real-time communication
io.on('connection', (socket) => {
  console.log("my conntection is established")
  socket.on("join-class",(data)=>{
   
    let{emailId,classSection}=data;
    console.log('User',emailId)
    emailToSocketMaping.set(emailId,socket.id)
    socketToEmailMaping.set(socket.id,emailId)
    socket.join(classSection)
    socket.emit("joined-class",{classSection})
    console.log("joined class",classSection)
    try{
      socket.broadcast.to(classSection).emit("user-joined",{emailId})
    }
    catch(err){
      console.log(err)
    }
   
  })
  socket.on("call-user",(data=>{
    const{emailId,offer}=data;
    console.log("call-user",data)
    const fromEmail=socketToEmailMaping.get(socket.id)
    const socketId=emailToSocketMaping.get(emailId);
    socket.to(socketId).emit("incoming-call",{
fromEmail,offer
    })
  }))
  socket.on("call-accepted",(data) => {
    const{fromEmail,answer}=data;
    const socketId =emailToSocketMaping.get(fromEmail);
    socket.to(socketId).emit("call-accepted",{fromEmail,answer})
})
  
  

  

});

// Server port handling
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Student Management System Server listening on port ${port}`);
});
