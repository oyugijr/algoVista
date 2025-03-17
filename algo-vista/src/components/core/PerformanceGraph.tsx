'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useSorting } from '@/components/providers/SortingProvider'

export const PerformanceGraph = () => {
  const { metricsHistory } = useSorting()

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-white">Performance Metrics</h3>
      <LineChart
        width={500}
        height={300}
        data={metricsHistory}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis 
          dataKey="time" 
          stroke="#6B7280" 
          label={{ 
            value: 'Time (ms)', 
            position: 'bottom',
            fill: '#9CA3AF'
          }}
        />
        <YAxis stroke="#6B7280" />
        <Tooltip
          contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
          itemStyle={{ color: '#E5E7EB' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="comparisons"
          stroke="#EF4444"
          name="Comparisons"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="swaps"
          stroke="#3B82F6"
          name="Swaps"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  )
}