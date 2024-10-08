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
    console.log("Incoming call from ", fromEmail);
    const answer = await peer.createAnswer(offer);
    socket.emit("call-accepted", {
      fromEmail,
      answer,
    });
  }
  async function handleNewUserJoined(data) {
    console.log("New user joined");
    const { emailId } = data;
    console.log("new user joined", emailId);
    const offer = await peer.createOffer();
    console.log("Offer: ", offer);
    socket.emit("call-user", { emailId, offer });
  }
  async function handlecallAccepted(data) {
    const { from,answer } = data;
    console.log("Call accepted by ", from);
    await peer.setRemoteDes(answer);
  }
  return <div>hello world</div>;
}
