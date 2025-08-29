'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ResultsResponse } from '@/lib/schema';
import { motion } from 'framer-motion';

interface ResultsChartProps {
  results: ResultsResponse;
}

// Mapping χρωμάτων για κάθε υποψήφιο
const colorMapping: Record<string, string> = {
  'Μητσοτάκης': '#1a5cc6',
  'Ανδρουλάκης': '#027b3c',
  'Κωνσταντοπούλου': '#af3b8b',
  'Λατινοπούλου': '#1863dc',
  'Κουτσούμπας': '#e70a11',
  'Βελόπουλος': '#4db2ec',
  'Κασσελάκης': '#5b15a7',
  'Φάμελλος': '#774fa0',
  'Χαρίτσης': '#e11b22',
  'Νατσιός': '#092544',
  'Άλλος': '#6b7280',
  'Κανένας': '#9ca3af'
};

export function ResultsChart({ results }: ResultsChartProps) {
  if (!results || !results.data) {
    return <div>Loading chart data...</div>;
  }

  const sortedData = [...results.data].sort((a, b) => b.count - a.count);
  const chartData = sortedData.map((item) => ({
    ...item,
    color: colorMapping[item.choice] || '#6b7280' // fallback color
  }));

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ payload: { choice: string; count: number; pct: number } }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">{data.pct}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="choice" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Ποσοστό %', angle: -90, position: 'insideLeft' }}
            domain={[0, 'dataMax']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="pct"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}