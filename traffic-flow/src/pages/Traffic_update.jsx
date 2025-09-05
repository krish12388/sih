import { useEffect, useState } from "react";
const LiveLocation = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [traffic, setTraffic] = useState("Smooth");

  // Simulate traffic AI
  const fetchTraffic = () => {
    const statuses = ["Smooth", "Moderate", "Heavy"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setTraffic(randomStatus);
  };

  useEffect(() => {
    const geoSuccess = (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ lat: latitude, lng: longitude });
      fetchTraffic();
    };
    const geoError = (err) => console.error("Geolocation error:", err);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }
  }, []);

  // Traffic color mapping
  const trafficColor =
    traffic === "Heavy"
      ? "#FF4D4D"
      : traffic === "Moderate"
      ? "#FFD24D"
      : "#4DFFB3";
  return (
    <div className="w-full min-h-screen bg-[#0A0D14] flex items-center justify-center p-6">
      <div className="bg-white/5  backdrop-blur-md border border-white/10 rounded-3xl shadow-xl max-w-4xl w-full p-8 flex  space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center w-full mb-6 space-y-4 md:space-y-0">
         <div>
          {/* Header */}
        <h1 className="text-3xl font-semibold text-white">
          Live Location & Traffic
        </h1>

        {/* Coordinates */}
        <div className="text-white text-lg space-y-1">
          <p>Latitude: {location.lat.toFixed(5)}</p>
          <p>Longitude: {location.lng.toFixed(5)}</p>
        </div>
        </div>

        {/* Traffic Status */}
        <div
          className="px-8 max-w-xl max-h-md py-3 rounded-full font-medium text-white w-max"
          style={{ backgroundColor: trafficColor }}
        >
          Traffic: {traffic}
        </div>
       </div>

      </div>
    </div>
  );
};

export default LiveLocation;
