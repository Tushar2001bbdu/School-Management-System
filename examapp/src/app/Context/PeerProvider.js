"use client";
import React, { useState, useEffect, createContext } from "react";
import { useContext } from 'react';
import { SocketContext } from './OnlineClassProvider'; // Make sure to import SocketContext

export const PeerContext = createContext(null);

export const PeerProvider = (props) => {
  const [peer, setPeer] = useState(null);
  const socket = useContext(SocketContext);

  // Initialize peer connection when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newPeer = new RTCPeerConnection({
        iceServers: [
          { urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478"
          ] },{
            urls: 'turn:relay.metered.ca:80',
            username: 'public-user',    // Dummy username
      credential: 'public-pass'   // Dummy password
        
          },
          {
            urls: 'turn:relay.metered.ca:443',
            username: 'public-user',    // Dummy username
      credential: 'public-pass'   // Dummy password
           
          }
        ],
        iceTransportPolicy: 'all',
        
      });

      // Handle ICE candidates
      newPeer.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("New ICE candidate: ", event.candidate);
          // Send the ICE candidate to the other peer through the signaling server
          socket.emit("ice-candidate", { toEmail: "<recipient-email>", candidate: event.candidate });
        }
      };

      setPeer(newPeer);
    } else {
      console.error('RTCPeerConnection is not supported in this environment');
    }
  }, [socket]);

  async function createOffer() {
    if (!peer) {
      console.log("No WebRTC connection");
      return;
    }
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    console.log("Offer: ", offer);
    return offer;
  }

  async function createAnswer(offer) {
    if (!peer) return;
    await peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  }

  async function setRemoteDes(answer) {
    if (!peer) return;
    await peer.setRemoteDescription(new RTCSessionDescription(answer));
    console.log("Answer received: ", answer);
  }

  function addIceCandidate(candidate) {
    if (peer) {
      const iceCandidate = new RTCIceCandidate(candidate);
      peer.addIceCandidate(iceCandidate).catch(error => {
        console.error("Error adding received ICE candidate", error);
      });
    }
  }

  return (
    <PeerContext.Provider value={{ createOffer, createAnswer, setRemoteDes, addIceCandidate }}>
      {props.children}
    </PeerContext.Provider>
  );
};
