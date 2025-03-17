'use client'

import { useSorting } from '@/components/providers/SortingProvider'
import { algorithms } from '@/lib/algorithms'

export const useMetricsExport = () => {
  const { algorithm, arraySize, comparisons, swaps } = useSorting() as unknown as {
    algorithm: keyof typeof algorithms
    arraySize: number
    comparisons: number
    swaps: number
  }

  const handleExport = () => {
    const data = {
      algorithm: algorithm,
      arraySize: arraySize,
      comparisons: comparisons,
      swaps: swaps,
      timestamp: new Date().toISOString(),
      timeComplexity: algorithms[algorithm].complexity.time,
      spaceComplexity: algorithms[algorithm].complexity.space
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `sort-metrics-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return { handleExport }
}