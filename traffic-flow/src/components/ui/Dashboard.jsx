import React from "react";

const stats = [
  {
    title: "Active Vehicles",
    value: "12,847",
    change: "+2.5% from last hour",
    description: "Currently on monitored roads",
    positive: true,
  },
  {
    title: "Avg Speed",
    value: "42 km/h",
    change: "−5.2% from avg",
    description: "City-wide average",
    positive: false,
  },
  {
    title: "Traffic Lights",
    value: "1,247",
    change: "≈98.2% operational",
    description: "",
    positive: true,
  },
];

export default function TrafficDashboard() {
  return (
    <div className=" text-white bg-[#0d1117] p-2 rounded-lg border border-gray-800 shadow-md mb-6">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-1">Traffic Control Dashboard</h2>
      <p className="text-gray-400 mb-6">
        Real-time monitoring and management of city traffic systems
      </p>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#010203] border border-gray-700 rounded-2xl p-5 flex flex-col justify-between"
          >
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-3xl font-bold">{item.value}</p>
            <p
              className={`text-sm ${
                item.positive ? "text-green-400" : "text-red-400"
              }`}
            >
              {item.change}
            </p>
            {item.description && (
              <p className="text-xs text-gray-400">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
