import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const PerformanceChart = () => {
  // Sample data for the chart
  const data = [
    { month: 'Jan', revenue2020: 10000, revenue2021: 15000 },
    { month: 'Feb', revenue2020: 15000, revenue2021: 20000 },
    { month: 'Mar', revenue2020: 18000, revenue2021: 15000 },
    { month: 'Apr', revenue2020: 20000, revenue2021: 25000 },
    { month: 'May', revenue2020: 25000, revenue2021: 20000 },
    { month: 'Jun', revenue2020: 38753, revenue2021: 30000 },
    { month: 'Jul', revenue2020: 32000, revenue2021: 35000 },
    { month: 'Aug', revenue2020: 25000, revenue2021: 32000 },
    { month: 'Sep', revenue2020: 20000, revenue2021: 35000 },
    { month: 'Oct', revenue2020: 22000, revenue2021: 22000 },
    { month: 'Nov', revenue2020: 26000, revenue2021: 30000 },
    { month: 'Dec', revenue2020: 28000, revenue2021: 35000 },
  ];

  // Custom tooltip component to match the design
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const highlightedValue = payload[0].dataKey === 'revenue2020' ? 
        payload[0].value : payload[1]?.value;
      
      return (
        <div className="bg-white p-2 shadow-md rounded-md text-xs">
          <p className="text-blue-500 font-medium">${highlightedValue.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  // Custom dot for data points
  const CustomDot = (props) => {
    const { cx, cy, value, dataKey, index } = props;
    
    // Only show dots for specific months (Jun and Oct in this example)
    if ((index === 5 && dataKey === 'revenue2020') || (index === 9 && dataKey === 'revenue2021')) {
      const color = dataKey === 'revenue2020' ? '#3B82F6' : '#EF4444';
      return (
        <>
          <circle cx={cx} cy={cy} r={5} fill="white" stroke={color} strokeWidth={2} />
          <circle cx={cx} cy={cy} r={2} fill={color} />
        </>
      );
    }
    return null;
  };

  // Format for Y-axis values
  const formatYAxis = (value) => {
    if (value === 0) return '$0';
    if (value === 10000) return '$10k';
    if (value === 20000) return '$20k';
    if (value === 30000) return '$30k';
    if (value === 40000) return '$40k';
    return '';
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium text-gray-700 mb-6">Performance</h2>
      
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-700">Total Revenue</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-500">2020</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-500">2021</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              padding={{ left: 30, right: 30 }}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={[0, 40000]}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            
            {/* Reference lines for Jun and Oct */}
            <ReferenceLine x="Jun" stroke="#E5E7EB" strokeDasharray="3 3" />
            <ReferenceLine x="Oct" stroke="#E5E7EB" strokeDasharray="3 3" />
            
            <Line
              type="monotone"
              dataKey="revenue2020"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={false}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="revenue2021"
              stroke="#EF4444"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;