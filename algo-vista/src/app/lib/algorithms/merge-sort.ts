import type { Algorithm } from '@/types'

export const mergeSort: Algorithm = {
  name: 'Merge Sort',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)',
  },
  pseudocode: [
    'procedure mergeSort(arr):',
    '    if length <= 1: return',
    '    mid = Math.floor(length/2)',
    '    left = mergeSort(arr[0..mid])',
    '    right = mergeSort(arr[mid..])',
    '    merge(left, right)',
    '',
    'procedure merge(left, right):',
    '    result = []',
    '    while left and right:',
    '        append smaller of left[0] or right[0]',
    '    append remaining elements',
  ],
  *generator(arr: number[]) {
    function* merge(low: number, mid: number, high: number): Generator<any> {
      const left = arr.slice(low, mid + 1)
      const right = arr.slice(mid + 1, high + 1)
      let i = 0, j = 0, k = low

      while (i < left.length && j < right.length) {
        yield { line: 8, compared: [low + i, mid + 1 + j], swapped: [] }
        
        if (left[i] <= right[j]) {
          arr[k] = left[i]
          i++
        } else {
          arr[k] = right[j]
          j++
        }
        yield { line: 9, compared: [], swapped: [k] }
        k++
      }

      while (i < left.length) {
        arr[k] = left[i]
        yield { line: 11, compared: [], swapped: [k] }
        i++
        k++
      }

      while (j < right.length) {
        arr[k] = right[j]
        yield { line: 11, compared: [], swapped: [k] }
        j++
        k++
      }
    }

    function* split(low: number, high: number): Generator<any> {
      if (low < high) {
        const mid = Math.floor((low + high) / 2)
        yield { line: 2, compared: [low, high], swapped: [] }
        
        yield* split(low, mid)
        yield* split(mid + 1, high)
        yield* merge(low, mid, high)
      }
    }

    yield* split(0, arr.length - 1)
    return arr
  }
}