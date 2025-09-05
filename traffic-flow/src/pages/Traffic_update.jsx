import React, { useState, useEffect } from "react";

const TrafficCard = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Vite environment variable
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [statusText, setStatusText] = useState("Click below to check live traffic...");
  const [checking, setChecking] = useState(false);
  const [severity, setSeverity] = useState("unknown"); // "clear" | "moderate" | "heavy" | "unknown"
  const [distance, setDistance] = useState(null);
  const [eta, setEta] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Color & emoji mapping
  const colorForSeverity = {
    clear: "from-emerald-500 to-green-400",
    moderate: "from-amber-400 to-orange-500",
    heavy: "from-red-500 to-pink-600",
    unknown: "from-gray-500 to-gray-400",
  };
  const emojiForSeverity = {
    clear: "✅",
    moderate: "⚠️",
    heavy: "🚨",
    unknown: "ℹ️",
  };

  // Load Google Maps JS dynamically
  useEffect(() => {
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setStatusText("❌ Failed to load Google Maps script.");
    document.head.appendChild(script);
  }, [apiKey]);

  const checkTraffic = () => {
    if (!scriptLoaded) {
      setStatusText("⏳ Loading Google Maps script...");
      return;
    }

    if (!navigator.geolocation) {
      setStatusText("❌ Geolocation not supported.");
      return;
    }

    setChecking(true);
    setStatusText("📍 Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const destLat = lat + 0.01;
        const destLng = lng + 0.01;

        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [{ lat, lng }],
            destinations: [{ lat: destLat, lng: destLng }],
            travelMode: window.google.maps.TravelMode.DRIVING,
            // drivingOptions removed to avoid trafficModel errors
            unitSystem: window.google.maps.UnitSystem.METRIC,
          },
          (response, status) => {
            setChecking(false);
            if (status !== "OK") {
              setStatusText(`❌ API Error: ${status}`);
              setSeverity("unknown");
              return;
            }

            const element = response.rows[0].elements[0];
            if (element.status !== "OK") {
              setStatusText(`❌ Route error: ${element.status}`);
              setSeverity("unknown");
              return;
            }

            const normal = element.duration.value;
            const withTraffic = element.duration_in_traffic?.value || normal;
            const delay = withTraffic - normal;

            let level = "clear";
            if (delay > 900) level = "heavy"; // > 15 min
            else if (delay > 300) level = "moderate"; // > 5 min

            setSeverity(level);
            setDistance(element.distance.text);
            setEta(element.duration_in_traffic?.text || element.duration.text);
            setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
            setStatusText(`${emojiForSeverity[level]} ${level.toUpperCase()} — ETA ${element.duration_in_traffic?.text || element.duration.text}`);
          }
        );
      },
      (err) => {
        setChecking(false);
        setStatusText("❌ Location access denied.");
        setSeverity("unknown");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const resetTraffic = () => {
    setStatusText("Click below to check live traffic...");
    setSeverity("unknown");
    setDistance(null);
    setEta(null);
    setLastUpdated(null);
  };

  return (
      <div className="max-w-md w-full p-6 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">🚦 Live Traffic</h2>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${colorForSeverity[severity]} shadow-md`}>
            {severity === "unknown" ? "UNKNOWN" : severity.toUpperCase()}
          </div>
        </div>

        <p className="text-gray-300 mb-6">{statusText}</p>

        <div className="grid grid-cols-3 gap-4 text-white/90 text-sm mb-6">
          <div>
            <div className="text-xs">Distance</div>
            <div className="font-medium">{distance || "—"}</div>
          </div>
          <div>
            <div className="text-xs">ETA</div>
            <div className="font-medium">{eta || "—"}</div>
          </div>
          <div>
            <div className="text-xs">Updated</div>
            <div className="font-medium">{lastUpdated || "—"}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={checkTraffic}
            disabled={checking || !scriptLoaded}
            className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transform transition disabled:opacity-60"
          >
            {checking ? "Checking..." : "Check Traffic"}
          </button>

          <button
            onClick={resetTraffic}
            className="px-4 py-2 rounded-xl border border-white/10 text-white/90 hover:bg-white/4 transition"
          >
            Reset
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Tip: Restrict your API key to your domain in Google Cloud Console.
        </p>
      </div>
    
  );
};

export default TrafficCard;
