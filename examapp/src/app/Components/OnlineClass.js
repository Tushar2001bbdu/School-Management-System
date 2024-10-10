import React, { useEffect, useContext } from "react";
import { SocketContext } from "../Context/OnlineClassProvider";
import { PeerContext } from "../Context/PeerProvider";

export default function OnlineClass() {
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("ice-candidate", handleIceCandidate); // Listen for incoming ICE candidates

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("ice-candidate", handleIceCandidate); // Cleanup listener
    };
  }, [socket, peer]);

  async function handleIncomingCall(data) {
    console.log("Someone is calling from:", data.fromEmail);
    const { offer } = data;

    const answer = await peer.createAnswer(offer);
    socket.emit("call-accepted", { fromEmail: data.fromEmail, answer });
  }

  async function handleNewUserJoined(data) {
    const { emailId } = data;
    console.log("New user joined:", emailId);

    const offer = await peer.createOffer();
    socket.emit("call-user", { emailId, offer });
  }

  async function handleCallAccepted(data) {
    const { answer } = data;
    console.log("Call accepted with answer:", answer);
    await peer.setRemoteDes(answer);
  }

  function handleIceCandidate(candidate) {
    if (candidate) {
      peer.addIceCandidate(candidate).catch(error => {
        console.error("Error adding received ICE candidate", error);
      });
    }
  }

  return <div>Hello World</div>;
}
