import { useCallback, useRef } from 'react'
import { useSorting } from '@/components/providers/SortingProvider'
import { useSound } from '@/hooks/useSound'

export const useSortingActions = () => {
  const { 
    algorithms,
    algorithm,
    array,
    speed,
    comparisons,
    swaps,
    currentStep,
    pseudocodeLine
  } = useSorting()
  
  const sortingRef = useRef<Generator | null>(null)
  const { playComparisonSound, playSwapSound } = useSound()

  const startSorting = useCallback(async () => {
    const algo = algorithms[algorithm]
    sortingRef.current = algo.generator([...array])
    
    let next = sortingRef.current?.next()
    while (next && !next.done) {
      const { value } = next as { value: { compared?: any[]; swapped?: unknown[]; array?: any[]; line?: number } }
      
      // Update visualization state
      currentStep[1](value)
      pseudocodeLine(value.line ?? 0)
      
      // Update metrics
      if (value.compared?.length) {
        comparisons[1](c => c + 1)
        playComparisonSound()
      }
      if (value.swapped?.length) {
        swaps[1](s => s + 1)
        playSwapSound()
      }

      // Update array if modified
      if (value.array) {
        array[1](value.array)
      }

      await new Promise(resolve => 
        setTimeout(resolve, 110 - Number(speed))
      )
      if (sortingRef.current) {
        next = sortingRef.current.next()
      } else {
        break
      }
    }
  }, [algorithms, algorithm, array, currentStep, pseudocodeLine, comparisons, playComparisonSound, swaps, playSwapSound, speed])

  const stopSorting = useCallback(() => {
    sortingRef.current = null
  }, [])

  return { startSorting, stopSorting }
}