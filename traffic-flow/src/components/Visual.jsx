import React from "react";

const GraphVisualizer = ({ data }) => {
  // Validate and default the data
  const safeData = Array.isArray(data) && data.length > 0 ? data : [0];

  // Dimensions
  const width = 800;
  const height = 400;
  const padding = 50;

  // Compute maximum value
  const max = Math.max(...safeData);

  // Compute horizontal step
  const stepX =
    safeData.length > 1 ? (width - 2 * padding) / (safeData.length - 1) : 1;

  // Compute SVG points
  const points = safeData
    .map((d, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (d / max) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-[30%] flex justify-center items-center  p-6 h-[30%]">
      <div className="bg-gray-600 backdrop-blur-3xl rounded-3xl shadow-xl p-6 max-w-xl w-full">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Data Graph Visualizer
        </h2>

        <svg
          width="100%"
          height="150"
          viewBox={`0 0 ${width} ${height}`}
          className="rounded-xl"
        >
          {/* Background */}
          <rect width={width} height={height} fill="#11122b" rx="16" />

          {/* Grid lines */}
          <g stroke="#ffffff22" strokeWidth="0.5">
            {[...Array(5)].map((_, i) => {
              const y = padding + i * ((height - 2 * padding) / 4);
              return <line key={i} x1={padding} y1={y} x2={width - padding} y2={y} />;
            })}
          </g>

          {/* Gradient line for data */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#7b4dff" />
            </linearGradient>
          </defs>

          {/* Data line */}
          <polyline
            points={points}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data points */}
          {safeData.map((d, i) => {
            const x = padding + i * stepX;
            const y = height - padding - (d / max) * (height - 2 * padding);
            return <circle key={i} cx={x} cy={y} r={5} fill="#00d4ff" />;
          })}
        </svg>
      </div>
    </div>
  );
};

export default GraphVisualizer;
