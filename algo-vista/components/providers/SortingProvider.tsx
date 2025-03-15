'use client'

import { atom, useAtom } from 'jotai'
import { generateArray } from '@/lib/utils'
import { algorithms, type AlgorithmKey } from '@/lib/algorithms'

// State atoms
const arrayAtom = atom<number[]>([])
const algorithmAtom = atom<AlgorithmKey>('bubble')
const isSortingAtom = atom(false)
const speedAtom = atom(50)
const arraySizeAtom = atom(50)
const comparisonsAtom = atom(0)
const swapsAtom = atom(0)
const currentStepAtom = atom<any>(null)

export const SortingProvider = ({ children }: { children: React.ReactNode }) => {
  const [array, setArray] = useAtom(arrayAtom)
  const [algorithm] = useAtom(algorithmAtom)
  const [isSorting] = useAtom(isSortingAtom)
  const [speed] = useAtom(speedAtom)
  const [arraySize] = useAtom(arraySizeAtom)
  const [comparisons, setComparisons] = useAtom(comparisonsAtom)
  const [swaps, setSwaps] = useAtom(swapsAtom)
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)

  // Initialize array
  useEffect(() => {
    setArray(generateArray(arraySize))
  }, [arraySize, setArray])

  return (
    <Provider>
      {children}
    </Provider>
  )
}

export const useSorting = () => ({
  array: useAtom(arrayAtom),
  algorithm: useAtom(algorithmAtom),
  isSorting: useAtom(isSortingAtom),
  speed: useAtom(speedAtom),
  arraySize: useAtom(arraySizeAtom),
  comparisons: useAtom(comparisonsAtom),
  swaps: useAtom(swapsAtom),
  currentStep: useAtom(currentStepAtom),
})