'use client'

import { useSorting } from '@/components/providers/SortingProvider'
import { AlgorithmKey } from '@/lib/algorithms'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

export const ControlPanel = () => {
  const { algorithms } = useSorting()
  const [algorithm, setAlgorithm] = useSorting().algorithm
  const [arraySize, setArraySize] = useSorting().arraySize
  const [speed, setSpeed] = useSorting().speed

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg">
      {/* Algorithm Selection */}
      <div className="relative">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as AlgorithmKey)}
          className="w-full pl-3 pr-10 py-2 bg-gray-700 rounded-lg text-white appearance-none"
        >
          {Object.entries(algorithms).map(([key, algo]) => (
            <option key={key} value={key}>{algo.name}</option>
          ))}
        </select>
        <ChevronUpDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
      </div>

      {/* Array Size Control */}
      <div className="space-y-2">
        <label className="text-white block">Array Size: {arraySize}</label>
        <input
          type="range"
          min="10"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <label className="text-white block">Speed</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  )
}