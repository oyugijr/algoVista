import { bubbleSort } from './bubble-sort'
import { selectionSort } from './selection-sort'
import { insertionSort } from './insertion-sort'
import { quickSort } from './quick-sort'
import { mergeSort } from './merge-sort'

export const algorithms = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  quick: quickSort,
  merge: mergeSort,
} as const

export type AlgorithmKey = keyof typeof algorithms
export type Algorithm = typeof algorithms[AlgorithmKey]