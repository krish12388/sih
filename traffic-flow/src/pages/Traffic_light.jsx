import React, { useEffect, useRef, useState } from "react";

export default function MultiCameraTrafficLight() {
  const [devices, setDevices] = useState([]);
  const [camera1, setCamera1] = useState("");
  const [camera2, setCamera2] = useState("");
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  // Get permission + device list
  useEffect(() => {
    async function initDevices() {
      try {
        // Request default camera access first (needed for labels to show)
        await navigator.mediaDevices.getUserMedia({ video: true });

        const allDevices = await navigator.mediaDevices.enumerateDevices();
        setDevices(allDevices.filter((d) => d.kind === "videoinput"));
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    initDevices();
  }, []);

  // Helper to start stream for a given device
  async function startStream(deviceId, videoRef) {
    try {
      // Stop any old stream first
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }

      const constraints = deviceId
        ? { video: { deviceId: { exact: deviceId } } }
        : { video: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
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

  // --- Simulated ML model output ---
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    if (camera1 && camera2) {
      setAnalysisResult({
        camera1: {
          predicted: "Red light",
          accident: "No",
          confidence: 0.92,
          notes: "Traffic is stopped at red light. No accident detected.",
        },
        camera2: {
          predicted: "Green light",
          accident: "No",
          confidence: 0.87,
          notes: "Traffic is flowing. No accident detected.",
        },
      });
    } else {
      setAnalysisResult(null);
    }
  }, [camera1, camera2]);

  return (
    <div className="min-h-screen bg-[#05060a] text-white flex flex-col items-center px-6 py-12 space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] bg-clip-text text-transparent">
        Multi-Camera Traffic Light Detector
      </h1>
      <p className="text-gray-400">
        Connect and monitor two cameras simultaneously
      </p>

      <div className="flex space-x-8">
        {/* Camera 1 */}
        <div>
          <select
            className="mb-2 bg-black/40 border border-gray-700 px-3 py-2 rounded"
            value={camera1}
            onChange={(e) => setCamera1(e.target.value)}
          >
            <option value="">Select Camera 1</option>
            {devices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label || `Camera ${d.deviceId}`}
              </option>
            ))}
          </select>
          <video
            ref={videoRef1}
            autoPlay
            playsInline
            muted
            className="w-[400px] h-[300px] rounded-lg border border-white/20"
          />
        </div>

        {/* Camera 2 */}
        <div>
          <select
            className="mb-2 bg-black/40 border border-gray-700 px-3 py-2 rounded"
            value={camera2}
            onChange={(e) => setCamera2(e.target.value)}
          >
            <option value="">Select Camera 2</option>
            {devices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label || `Camera ${d.deviceId}`}
              </option>
            ))}
          </select>
          <video
            ref={videoRef2}
            autoPlay
            playsInline
            muted
            className="w-[400px] h-[300px] rounded-lg border border-white/20"
          />
        </div>
      </div>

      {/* AI Analysis Output */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl w-full max-w-4xl p-6 md:p-8 flex flex-col gap-4 mt-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl font-semibold">ML Model Analysis Output</h2>
          {analysisResult && (
            <span className="text-xs px-2 py-1 rounded-full border border-white/20 text-white/80 bg-white/5">
              Updated just now
            </span>
          )}
        </div>
        {!analysisResult ? (
          <div className="text-white/70 text-sm">
            No analysis yet. Select both cameras to see predicted results here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Camera 1 Analysis */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-bold mb-2">Camera 1</h3>
              <p className="text-white/60 text-xs">Predicted</p>
              <p className="text-lg">{analysisResult.camera1.predicted}</p>
              <p className="text-white/60 text-xs mt-2">Accident</p>
              <p className="text-lg">{analysisResult.camera1.accident}</p>
              <p className="text-white/60 text-xs mt-2">Confidence</p>
              <p className="text-lg">
                {Math.round(
                  (analysisResult.camera1.confidence || 0) * 100
                )}
                %
              </p>
              {analysisResult.camera1.notes && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2 mt-2">
                  <p className="text-white/60 text-xs">Notes</p>
                  <p className="text-white/90 text-sm">
                    {analysisResult.camera1.notes}
                  </p>
                </div>
              )}
            </div>
            {/* Camera 2 Analysis */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-bold mb-2">Camera 2</h3>
              <p className="text-white/60 text-xs">Predicted</p>
              <p className="text-lg">{analysisResult.camera2.predicted}</p>
              <p className="text-white/60 text-xs mt-2">Accident</p>
              <p className="text-lg">{analysisResult.camera2.accident}</p>
              <p className="text-white/60 text-xs mt-2">Confidence</p>
              <p className="text-lg">
                {Math.round(
                  (analysisResult.camera2.confidence || 0) * 100
                )}
                %
              </p>
              {analysisResult.camera2.notes && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2 mt-2">
                  <p className="text-white/60 text-xs">Notes</p>
                  <p className="text-white/90 text-sm">
                    {analysisResult.camera2.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

