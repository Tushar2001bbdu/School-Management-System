"use client";
import React, { useState,useMemo ,createContext,useEffect} from "react";


export const PeerContext = createContext(null);

export const PeerProvider = (props) => {
  const [peer, setPeer] = useState(null);

  // Use useEffect to ensure peer is initialized only in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newPeer = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "turn:numb.viagenie.ca:3478?transport=udp", username: "user", credential: "pass" },
        ],
      });
      setPeer(newPeer);
    } else {
      console.error('RTCPeerConnection is not supported in this environment');
    }
  }, []); // Empty dependency array ensures this runs only once on mount
 
  async function createOffer(){
    if(!peer)  {console.log("no webrtc connection");return;}
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    console.log("Offer: ", offer);
    return offer;
  }
  async function createAnswer(offer){
    if(!peer) return;
    await peer.setRemoteDescription(offer)
    const answer = await peer.createAnswer(offer);
    await peer.setLocalDescription(answer);
    return answer;
  }
  async function setRemoteDes(answer){
    if(!peer) return;
   
    await peer.setRemoteDescription(answer);
    console.log("Answer received: ", answer);
  }
  return (
    <PeerContext.Provider value={{createOffer,createAnswer,setRemoteDes}}>
      {props.children}
    </PeerContext.Provider>
  );
};
