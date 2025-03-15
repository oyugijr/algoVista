// components/core/AlgorithmComparison.tsx
'use client'

import { useAtom } from 'jotai'
import { sortingAtoms } from '@/components/providers/SortingProvider'
import { ArrayVisualizer } from './ArrayVisualizer'

export const AlgorithmComparison = () => {
  const [leftAtom, rightAtom] = useAtom(sortingAtoms)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algorithm 1</h2>
        <ArrayVisualizer instanceAtom={leftAtom} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algorithm 2</h2>
        <ArrayVisualizer instanceAtom={rightAtom} />
      </div>
    </div>
  )
}