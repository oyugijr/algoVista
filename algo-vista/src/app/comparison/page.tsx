// app/comparison/page.tsx
'use client'

import { SortingProvider } from '@/components/providers/SortingProvider'
import { AlgorithmComparison } from '@/components/core/AlgorithmComparison'

export default function ComparisonPage() {
  return (
    <SortingProvider>
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center">
            Algorithm Comparison Mode
          </h1>
          <AlgorithmComparison />
        </div>
      </main>
    </SortingProvider>
  )
}