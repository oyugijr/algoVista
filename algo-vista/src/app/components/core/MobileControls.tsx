// components/core/MobileControls.tsx
'use client'

import { useSorting } from 'src/components/providers/SortingProvider'
import { MetricsExport } from 'src/components/core/MetricsExport'

export const MobileControls = () => {
  const [{ isSorting }, { startSorting, stopSorting }] = useSorting()

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden p-4 bg-gray-800">
      <div className="flex justify-between items-center">
        <button
          className={`px-4 py-2 rounded-lg ${
            isSorting ? 'bg-red-500' : 'bg-green-500'
          }`}
          onClick={isSorting ? stopSorting : startSorting}
        >
          {isSorting ? 'Stop' : 'Start'}
        </button>
        <MetricsExport />
      </div>
    </div>
  )
}