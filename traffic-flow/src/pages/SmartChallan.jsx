import React, { useState } from 'react';

export default function SmartChallan() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('image');
  const [challanData, setChallanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Send image or video to backend for challan generation
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setChallanData(null);
    setError(null);
    if (!file) return;
    setFileType(file.type.startsWith('video/') ? 'video' : 'image');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/generate-challan', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to generate challan');
      const data = await res.json();
      setChallanData(data);
    } catch (err) {
      setError('Error generating challan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0D14] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          🚨 Smart Challan System
        </h1>
        {/* Upload Card */}
        <div className="bg-[#181C25] border border-yellow-400/30 rounded-2xl p-8 mb-8 shadow-lg flex flex-col items-center">
          <label className="block w-full mb-4">
            <span className="font-semibold text-lg">Upload Vehicle Image or Video:</span>
            <input
              type="file"
              accept="image/*,video/*"
              className="block mt-2 text-white w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-[#181C25] hover:file:bg-yellow-500 transition"
              onChange={handleFileUpload}
              disabled={loading}
            />
          </label>
          {selectedFile && fileType === 'image' && (
            <div className="mb-4 w-full flex justify-center">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded"
                className="max-h-48 rounded-lg border border-yellow-400/30 shadow"
              />
            </div>
          )}
          {selectedFile && fileType === 'video' && (
            <div className="mb-4 w-full flex justify-center">
              <video
                src={URL.createObjectURL(selectedFile)}
                controls
                className="max-h-48 rounded-lg border border-yellow-400/30 shadow"
              />
            </div>
          )}
          {loading && (
            <div className="text-yellow-400 font-semibold mb-2 animate-pulse">
              Processing file and generating challan(s)...
            </div>
          )}
          {error && (
            <div className="text-red-400 font-semibold mb-2">{error}</div>
          )}
        </div>
        {/* Response Card(s) */}
        {challanData && challanData.type === 'image' && (
          <div className="bg-[#23283a] border border-yellow-500/40 rounded-2xl p-8 shadow-lg mt-4">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
              <span role="img" aria-label="ticket">🎫</span> E-Challan Generated
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
              <div>
                <b>Challan ID:</b> <span className="text-yellow-300">{challanData.challan.challanId}</span>
              </div>
              <div>
                <b>Vehicle Number:</b> <span className="text-yellow-300">{challanData.challan.vehicleNumber}</span>
              </div>
              <div>
                <b>Violation:</b> <span className="text-red-400">{challanData.challan.violation}</span>
              </div>
              <div>
                <b>Date:</b> <span className="text-yellow-200">{challanData.challan.date}</span>
              </div>
              <div>
                <b>Fine Amount:</b> <span className="text-green-400 font-bold">₹{challanData.challan.fine}</span>
              </div>
            </div>
          </div>
        )}
        {challanData && challanData.type === 'video' && (
          <div className="bg-[#23283a] border border-yellow-500/40 rounded-2xl p-8 shadow-lg mt-4">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
              <span role="img" aria-label="ticket">🎫</span> E-Challans Generated from Video
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {challanData.challans.map((challan, idx) => (
                <div key={challan.challanId} className="bg-[#181C25] border border-yellow-400/30 rounded-xl p-4">
                  <div className="mb-1"><b>Challan ID:</b> <span className="text-yellow-300">{challan.challanId}</span></div>
                  <div className="mb-1"><b>Vehicle Number:</b> <span className="text-yellow-300">{challan.vehicleNumber}</span></div>
                  <div className="mb-1"><b>Violation:</b> <span className="text-red-400">{challan.violation}</span></div>
                  <div className="mb-1"><b>Date:</b> <span className="text-yellow-200">{challan.date}</span></div>
                  <div className="mb-1"><b>Fine Amount:</b> <span className="text-green-400 font-bold">₹{challan.fine}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}