'use client'

import { useSorting } from '@/components/providers/SortingProvider'

export const MetricsDisplay = () => {
  const { algorithms, algorithm, comparisons, swaps } = useSorting()
  const currentAlgo = algorithms[algorithm]

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="text-center">
        <div className="text-gray-400 text-sm">Time Complexity</div>
        <div className="text-xl font-bold text-primary">
          {currentAlgo.complexity.time}
        </div>
      </div>
      <div className="text-center">
        <div className="text-gray-400 text-sm">Space Complexity</div>
        <div className="text-xl font-bold text-secondary">
          {currentAlgo.complexity.space}
        </div>
      </div>
      <div className="text-center">
        <div className="text-gray-400 text-sm">Comparisons</div>
        <div className="text-xl font-bold text-white">{Array.isArray(comparisons) ? comparisons[0] : comparisons}</div>
      </div>
      <div className="text-center">
        <div className="text-gray-400 text-sm">Swaps</div>
        <div className="text-xl font-bold text-white">{Array.isArray(swaps) ? swaps[0] : swaps}</div>
      </div>
    </div>
  )
}