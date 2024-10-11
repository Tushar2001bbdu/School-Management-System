import React, { useEffect, useRef, useState,useContext } from 'react';
import {SocketContext} from "../Context/OnlineClassProvider"
import io from 'socket.io-client';
import Peer from 'peerjs';

const OnlineClass = (props) => {
  const [peerId, setPeerId] = useState('');
  const [roomId] = useState('room1'); // Static room ID for now, can be dynamic
  const [stream, setStream] = useState(null);
  const videoRef = useRef();
  const remoteVideoRef = useRef();
  const socket=useContext(SocketContext);
  const peerRef = useRef();

 

  useEffect(() => {
   
    // 2. Initialize PeerJS connection
    peerRef.current = new Peer(undefined, {
      host: 'localhost',
      port: '3002',
      path: '/peerjs',
    });

    
    peerRef.current.on('open', (id) => {
      setPeerId(id);  
      
      socket.emit('join-room', props.roomId, id);
    });

    // 4. Get user media (webcam) and display it locally
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then((mediaStream) => {
      setStream(mediaStream);  // Set stream to state
      videoRef.current.srcObject = mediaStream;  // Display own video
    });

    // 5. Handle incoming calls
    peerRef.current.on('call', (call) => {
      call.answer(stream);  // Answer incoming call with local stream
      call.on('stream', (remoteStream) => {
        console.log('Remote user connected');  // Log message
        remoteVideoRef.current.srcObject = remoteStream;  // Display remote video stream
      });
    });

    // 6. Listen for 'user-connected' event and call the new user
    socket.on('user-connected', (userId) => {
      console.log(`User connected: ${userId}`);
      callUser(userId);  // Call the newly connected user
    });

    // 7. Handle user disconnection
    socket.on('user-disconnected', (userId) => {
      console.log(`User disconnected: ${userId}`);
    });

   
  }, [socket]);

  // Function to call another user
  const callUser = (userId) => {
    const call = peerRef.current.call(userId, stream);
    call.on('stream', (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;  // Display remote video stream
    });
  };

  return (
    <div>
      <h1>Peer.js + Socket.IO Video Chat</h1>
      <div>
        <h2>Your Video</h2>
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
      <div>
        <h2>Remote Video</h2>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </div>
  );
};

export default OnlineClass;
