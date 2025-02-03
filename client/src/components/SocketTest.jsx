import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SocketTestComponent = () => {
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState("");
  const [userUID, setUserUID] = useState(""); // New state to store user UID
  const [users, setUsers] = useState([]); // State to store connected users
  const canvasRef = useRef(null); // Ref to the canvas element

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    // Listen for the 'userUID' event to get the UID of the user
    newSocket.on("userUID", (data) => {
      setUserUID(data.uid);
      console.log("Received UID from server:", data.uid);
    });

    // Listen for new connections and disconnections
    newSocket.on("userConnected", (data) => {
      console.log("User connected:", data.uid); // Debug log
      setUsers((prevUsers) => [...prevUsers, data.uid]);
    });

    newSocket.on("userDisconnected", (uid) => {
      console.log("User disconnected:", uid); // Debug log
      setUsers((prevUsers) => prevUsers.filter((user) => user !== uid));
    });

    newSocket.on("testResponse", (data) => {
      setResponse(data.message);
      console.log("Response from server:", data);
    });

    return () => newSocket.close();
  }, []);

  // Function to draw circles for each user on the canvas
  const drawCircles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Check if canvas is available
    if (!canvas || !ctx) {
      console.error("Canvas or context is not available");
      return;
    }

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(users)

    // Draw a circle for each user
    users.forEach((user, index) => {
      const x = 50 + index * 100; // Positioning the circles horizontally
      const y = 100; // Vertical position
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2); // Draw a circle
      ctx.fillStyle = "#3498db"; // Circle color
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });
  };

  // Call drawCircles every time users change
  useEffect(() => {
    if (users.length > 0) {
      drawCircles();
    }
  }, [users]); // Redraw circles whenever users array changes

  const sendTestEvent = () => {
    if (socket) {
      socket.emit("testEvent", { testData: "Hello from React!" });
    }
  };

  return (
    <div>
      <h1>Socket.io Test</h1>
      <button onClick={sendTestEvent}>Send Test Event</button>
      <p>Server Response: {response}</p>
      {userUID && <p>Your User ID: {userUID}</p>} {/* Display the UID */}
      
      {/* Canvas to display the circles */}
      <canvas
        ref={canvasRef}
        width="600"
        height="200"
        style={{ border: "1px solid black", marginTop: "20px" }}
      ></canvas>
    </div>
  );
};

export default SocketTestComponent;
