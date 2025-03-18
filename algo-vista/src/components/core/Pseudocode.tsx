'use client'

import { useSorting } from 'src/components/providers/SortingProvider'

export const Pseudocode = () => {
  const { algorithms, algorithm, pseudocodeLine } = useSorting()
  const currentAlgo = algorithms[algorithm]

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-white">
        {currentAlgo.name} Pseudocode
      </h3>
      <div className="font-mono text-sm">
        {currentAlgo.pseudocode.map((line, index) => (
          <div
            key={index}
            className={`p-2 ${
              index === pseudocodeLine
                ? 'bg-yellow-900 text-yellow-100'
                : 'text-gray-300'
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}