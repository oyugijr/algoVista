'use client'

import { useSorting } from '@/components/providers/SortingProvider'
import { algorithms } from '@/lib/algorithms'

export const ControlPanel = () => {
  const [
    { arraySize, speed, isSorting, algorithm },
    { setArray, setAlgorithm, setSpeed, setArraySize, setIsSorting }
  ] = useSorting()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg">
      <div className="space-y-2">
        <label className="text-white">Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as AlgorithmKey)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          {Object.entries(algorithms).map(([key, algo]) => (
            <option key={key} value={key}>{algo.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-white">Array Size: {arraySize}</label>
        <input
          type="range"
          min="10"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-white">Speed</label>
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