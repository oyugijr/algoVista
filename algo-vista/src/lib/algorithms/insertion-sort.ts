import type { Algorithm } from '@/types'

export const insertionSort: Algorithm = {
  name: 'Insertion Sort',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },
  pseudocode: [
    'procedure insertionSort(arr: number[]):',
    '    for i from 1 to n-1:',
    '        key = arr[i]',
    '        j = i-1',
    '        while j >= 0 and arr[j] > key:',
    '            arr[j+1] = arr[j]',
    '            j = j-1',
    '        arr[j+1] = key',
  ],
  *generator(arr: number[]) {
    const n = arr.length
    
    for (let i = 1; i < n; i++) {
      const key = arr[i]
      let j = i-1
      yield { line: 2, compared: [i], swapped: [] }
      
      while (j >= 0 && arr[j] > key) {
        yield { line: 4, compared: [j, i], swapped: [] }
        arr[j+1] = arr[j]
        yield { line: 5, compared: [], swapped: [j, j+1] }
        j--
      }
      
      arr[j+1] = key
      yield { line: 7, compared: [], swapped: [j+1] }
    }
    return arr
  }
}