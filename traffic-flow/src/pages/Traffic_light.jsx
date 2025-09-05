// src/pages/MultiCameraTrafficLight.jsx
import React, { useEffect, useRef, useState } from "react";

export default function MultiCameraTrafficLight() {
  const [devices, setDevices] = useState([]);
  const [camera1, setCamera1] = useState(null);
  const [camera2, setCamera2] = useState(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    async function getDevices() {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      setDevices(allDevices.filter((d) => d.kind === "videoinput"));
    }
    getDevices();
  }, []);

  async function startStream(deviceId, videoRef) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera error:", error);
    }
  }

  useEffect(() => {
    if (camera1) startStream(camera1, videoRef1);
  }, [camera1]);

  useEffect(() => {
    if (camera2) startStream(camera2, videoRef2);
  }, [camera2]);

  return (
    <div className="min-h-screen bg-[#05060a] text-white flex flex-col items-center px-6 py-12 space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] bg-clip-text text-transparent">
        Multi-Camera Traffic Light Detector
      </h1>
      <p className="text-gray-400">Connect and monitor two cameras simultaneously</p>

      <div className="flex space-x-8">
        {/* Camera 1 */}
        <div>
          <select
            className="mb-2 bg-black/40 border border-gray-700 px-3 py-2 rounded"
            onChange={(e) => setCamera1(e.target.value)}
          >
            <option value="">Select Camera 1</option>
            {devices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label || `Camera ${d.deviceId}`}
              </option>
            ))}
          </select>
          <video ref={videoRef1} autoPlay playsInline muted className="w-[400px] h-[300px] rounded-lg border border-white/20" />
        </div>

        {/* Camera 2 */}
        <div>
          <select
            className="mb-2 bg-black/40 border border-gray-700 px-3 py-2 rounded"
            onChange={(e) => setCamera2(e.target.value)}
          >
            <option value="">Select Camera 2</option>
            {devices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label || `Camera ${d.deviceId}`}
              </option>
            ))}
          </select>
          <video ref={videoRef2} autoPlay playsInline muted className="w-[400px] h-[300px] rounded-lg border border-white/20" />
        </div>
      </div>
    </div>
  );
}
