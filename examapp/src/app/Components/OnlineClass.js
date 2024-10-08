import React, { useEffect, useContext } from "react";
import { SocketContext } from "../Context/OnlineClassProvider";
import { PeerContext } from "../Context/PeerProvider";
export default function OnlineClass() {
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);
  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handlecallAccepted);
    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handlecallAccepted);
    };
  }, []);
  async function handleIncomingCall(data) {
    console.log("someone is calling");
    const { fromEmail, offer } = data;

    const answer = await peer.createAnswer(offer);
    socket.emit("call-accepted", {
      fromEmail,
      answer,
    });
  }
  async function handleNewUserJoined(data) {
    const { emailId } = data;

    const offer = await peer.createOffer();

    socket.emit("call-user", { emailId, offer });
  }
  async function handlecallAccepted(data) {
    const { answer } = data;

    await peer.setRemoteDes(answer);
  }
  return <div>hello world</div>;
}
