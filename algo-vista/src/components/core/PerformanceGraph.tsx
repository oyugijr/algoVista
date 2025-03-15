// components/core/PerformanceGraph.tsx
'use client'

import { useSorting } from '@/components/providers/SortingProvider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

export const PerformanceGraph = () => {
  const [{ metricsHistory }] = useSorting()

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
      <LineChart width={500} height={300} data={metricsHistory}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Line 
          type="monotone" 
          dataKey="comparisons" 
          stroke="#ff7300" 
          name="Comparisons"
        />
        <Line
          type="monotone"
          dataKey="swaps"
          stroke="#82ca9d"
          name="Swaps"
        />
      </LineChart>
    </div>
  )
}