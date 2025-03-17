'use client'

import { useSorting } from '@/components/providers/SortingProvider'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { useMetricsExport } from './MetricsExport'

export const MobileControls = () => {
  const { isSorting, startSorting } = useSorting()
  const { handleExport } = useMetricsExport()

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex justify-between items-center">
        <button
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
            isSorting ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
          onClick={isSorting ? stopSorting : startSorting}
        >
          {isSorting ? 'Stop' : 'Start'}
        </button>
        
        <button
          onClick={handleExport}
          className="p-2 text-gray-300 hover:text-white"
          aria-label="Export metrics"
        >
          <DocumentArrowDownIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}