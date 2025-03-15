import type { Algorithm } from '@/types'

export const quickSort: Algorithm = {
  name: 'Quick Sort',
  complexity: {
    time: 'O(n log n)',
    space: 'O(log n)',
  },
  pseudocode: [
    'procedure quickSort(arr, low, high):',
    '    if low < high:',
    '        pi = partition(arr, low, high)',
    '        quickSort(arr, low, pi-1)',
    '        quickSort(arr, pi+1, high)',
    '',
    'function partition(arr, low, high):',
    '    pivot = arr[high]',
    '    i = low - 1',
    '    for j from low to high-1:',
    '        if arr[j] < pivot:',
    '            i++',
    '            swap arr[i] and arr[j]',
    '    swap arr[i+1] and arr[high]',
    '    return i+1',
  ],
  *generator(arr: number[]) {
    function* partition(low: number, high: number): Generator<any, number> {
      const pivot = arr[high]
      let i = low - 1
      
      for (let j = low; j < high; j++) {
        yield { line: 8, compared: [j, high], swapped: [] }
        
        if (arr[j] < pivot) {
          i++
          yield { line: 9, compared: [i, j], swapped: [] }
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          yield { line: 10, compared: [], swapped: [i, j] }
        }
      }
      
      yield { line: 12, compared: [i+1, high], swapped: [] }
      ;[arr[i+1], arr[high]] = [arr[high], arr[i+1]]
      return i + 1
    }

    const stack: [number, number][] = []
    stack.push([0, arr.length - 1])

    while (stack.length) {
      const [low, high] = stack.pop()!
      yield { line: 1, compared: [low, high], swapped: [] }

      if (low < high) {
        const piGen = partition(low, high)
        let result = piGen.next()
        
        while (!result.done) {
          yield result.value
          result = piGen.next()
        }
        
        const pi = result.value
        stack.push([pi + 1, high])
        stack.push([low, pi - 1])
      }
    }
    return arr
  }
}