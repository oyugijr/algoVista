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
    
    let next = sortingRef.current.next()
    while (!next.done) {
      const { value } = next
      
      // Update visualization state
      setCurrentStep(value)
      setPseudocodeLine(value.line ?? 0)
      
      // Update metrics
      if (value.compared?.length) {
        setComparisons(c => c + 1)
        playComparisonSound()
      }
      if (value.swapped?.length) {
        setSwaps(s => s + 1)
        playSwapSound()
      }

      // Update array if modified
      if (value.array) {
        setArray(value.array)
      }

      await new Promise(resolve => 
        setTimeout(resolve, 110 - speed)
      )
      next = sortingRef.current.next()
    }
  }, [algorithm, array, speed, algorithms])

  const stopSorting = useCallback(() => {
    sortingRef.current = null
  }, [])

  return { startSorting, stopSorting }
}