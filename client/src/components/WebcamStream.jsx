import React, { useEffect, useRef } from 'react';

const WebcamStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-white text-2xl font-bold mb-4 z-10">Webcam Stream</h1>
      
      <div className="relative w-full max-w-4xl h-auto">
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-auto rounded-lg border-4 border-gray-700 shadow-lg"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-red-500 opacity-30 rounded-lg">
            we'll be right back...
        </div>
      </div>
    </div>
  );
};

export default WebcamStream;
