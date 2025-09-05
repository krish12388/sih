import React from "react";

const alerts = [
  {
    title: "Vehicle Collision",
    description: "Two-car collision blocking the right lane",
    location: "Highway 401 & Exit 25",
    time: "2 minutes ago",
    status: "active",
  },
  {
    title: "Heavy Traffic",
    description: "Unusual congestion due to ongoing construction",
    location: "Downtown Core - King St",
    time: "15 minutes ago",
    status: "investigating",
  },
  {
    title: "Traffic Light Maintenance",
    description: "Scheduled maintenance on intersection signals",
    location: "Main St & 5th Avenue",
    time: "1 hour ago",
    status: "active",
  },
];

export default function ActiveAlerts() {
  return (
    <div className=" text-white p-4 w-[100%] rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          ⚠️ Active Alerts
          <span className="ml-2 bg-red-600 text-white text-sm px-2 py-0.5 rounded-full">
            {alerts.length}
          </span>
        </h2>
        <button className="px-4 py-2 bg-gray-800 text-gray-200 rounded-xl hover:bg-gray-700">
          View All
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex flex-col gap-2"
          >
            {/* Title + Status + Close */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{alert.title}</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`capitalize px-2 py-1 text-xs rounded-md ${
                    alert.status === "active"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {alert.status}
                </span>
                <button className="text-gray-400 hover:text-red-400">✕</button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300">{alert.description}</p>

            {/* Location + Time */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">📍 {alert.location}</span>
              <span className="flex items-center gap-1">⏰ {alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
