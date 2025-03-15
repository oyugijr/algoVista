// components/core/MetricsExport.tsx
'use client'

import { useSorting } from '@/components/providers/SortingProvider'

export const MetricsExport = () => {
  const [{ arraySize, comparisons, swaps, algorithm }] = useSorting()

  const handleExport = () => {
    const data = {
      algorithm,
      arraySize,
      comparisons,
      swaps,
      timestamp: new Date().toISOString(),
      complexity: algorithms[algorithm].complexity
    }
    
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `sort-metrics-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <button 
      onClick={handleExport}
      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
    >
      Export Metrics
    </button>
  )
}