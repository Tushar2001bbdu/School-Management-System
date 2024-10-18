"use client"; // Ensure this component runs in the client-side environment

import React, { useEffect, useContext, useState, useRef } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import { OnlineClassContext } from "../Context/OnlineClassProvider";

const OnlineClass = (props) => {
  const context = useContext(OnlineClassContext);
  const leaveUrl = "http://localhost:3000/Details/OnlineClass";
  const role = 1;
  const { meetingNumber, userName, passWord = "" } = props;
  const containerRef = useRef(null);
  const leaveMeetingRef = useRef(null);
  const [isMeetingReady, setIsMeetingReady] = useState(false);

  const leaveMeeting = () => {
    ZoomMtg.leaveMeeting({
      success: (res) => {
        console.log("Leave meeting success:", res);
      },
      error: (err) => {
        console.error("Leave meeting error:", err);
      },
    });
  };

  const startMeeting = () => {
    if (!context.signature || !context.signature.signature) {
      console.error("Signature not available, cannot start the meeting.");
      return;
    }

    const zoomContainer = document.getElementById("zmmtg-root");
    if (!zoomContainer) {
      console.error("Zoom container not found.");
      return;
    }

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: () => {
        ZoomMtg.join({
          meetingNumber: meetingNumber,
          userName: userName,
          signature: context.signature.signature,
          apiKey: "7SYv3wWJQoOU5jbwXbGyQ",
          targetElement: zoomContainer,
          success: (res) => {
            console.log("Join meeting success:", res);
            setIsMeetingReady(true);
          },
          error: (err) => {
            console.error("Join meeting error:", err);
          },
        });
      },
      error: (err) => {
        console.error("Zoom init error:", err);
      },
    });
  };

  useEffect(() => {
    const setupZoomSDK = async () => {
      if (context.signature === null) {
        await context.generateSignature(meetingNumber, role);
      }

      if (context.signature && context.signature.signature) {
        ZoomMtg.setZoomJSLib("https://source.zoom.us/2.18.2/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        setIsMeetingReady(true);
        startMeeting();
      }
    };

    setupZoomSDK();
  }, [meetingNumber, role, context.signature, containerRef]);
  s;

  return (
    <div>
      <div id="zmmtg-root" ref={containerRef}></div>

      <button id="leave">Leave Meeting</button>
    </div>
  );
};

export default OnlineClass;
