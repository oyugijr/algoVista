import type { Algorithm } from '@/types'

export const selectionSort: Algorithm = {
  name: 'Selection Sort',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },
  pseudocode: [
    'procedure selectionSort(arr: number[]):',
    '    n = arr.length',
    '    for i from 0 to n-1:',
    '        minIndex = i',
    '        for j from i+1 to n:',
    '            if arr[j] < arr[minIndex]:',
    '                minIndex = j',
    '        swap arr[i] and arr[minIndex]',
  ],
  *generator(arr: number[]) {
    const n = arr.length
    
    for (let i = 0; i < n-1; i++) {
      let minIndex = i
      yield { line: 2, compared: [i], swapped: [] }
      
      for (let j = i+1; j < n; j++) {
        yield { line: 4, compared: [minIndex, j], swapped: [] }
        
        if (arr[j] < arr[minIndex]) {
          minIndex = j
          yield { line: 5, compared: [minIndex], swapped: [] }
        }
      }
      
      if (minIndex !== i) {
        yield { line: 7, compared: [], swapped: [i, minIndex] }
        ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
      }
    }
    return arr
  }
}