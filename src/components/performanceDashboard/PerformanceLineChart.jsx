import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const PracticeSessionsChart = ({ practiceSessions }) => {
  // Sample data for the chart
  const data = [
    { name: 'Sunday', sessions: 80 },
    { name: 'Monday', sessions: 150 },
    { name: 'Tuesday', sessions: 220 },
    { name: 'Wednesday', sessions: 150 },
    { name: 'Thursday', sessions: 180 },
    { name: 'Friday', sessions: 120 },
    { name: 'Saturday', sessions: 220 },
  ];

  // Custom tooltip component to match the design
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md">
          <p className="font-semibold text-gray-800">{`${payload[0].value} Order`}</p>
          <p className="text-xs text-gray-500">Oct 18th, 2020</p>
        </div>
      );
    }
    return null;
  };

  // Custom dot to highlight a specific data point
  const CustomDot = (props) => {
    const { cx, cy, index } = props;
    // Highlight Tuesday (index 2) with a green dot
    if (index === 2) {
      return <circle cx={cx} cy={cy} r={6} fill="#5c9f24" stroke="none" />;
    }
    return null;
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-1">
        Practice Sessions Per Week
      </h2>
      <p className="text-gray-400 mb-8 text-sm">
        Increasing to 5 allows for better recovery and reduces the risk of
        overtraining.{' '}
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5c9f24" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#5c9f24" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 13 }}
              dy={10}
            />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="#5c9f24"
              strokeWidth={3}
              dot={false}
              activeDot={false}
              fill="url(#colorSessions)" // 🔥 This line enables the shaded area
              fillOpacity={0.3}
              connectNulls={true}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="none"
              dot={<CustomDot />}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PracticeSessionsChart;
