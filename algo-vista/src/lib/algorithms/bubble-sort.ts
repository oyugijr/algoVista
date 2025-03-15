export const bubbleSort = {
    name: 'Bubble Sort',
    complexity: {
      time: 'O(n²)',
      space: 'O(1)'
    },
    pseudocode: [
      'procedure bubbleSort(A: list)',
      '    n = length(A)',
      '    for i from 0 to n-1:',
      '        for j from 0 to n-i-2:',
      '            if A[j] > A[j+1]:',
      '                swap A[j] and A[j+1]'
    ],
    *generator(arr: number[]) {
      const n = arr.length
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          yield { 
            array: [...arr], 
            compared: [j, j + 1],
            line: 3
          }
          
          if (arr[j] > arr[j + 1]) {
            ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            yield { 
              array: [...arr], 
              swapped: [j, j + 1],
              line: 5
            }
          }
        }
      }
      return arr
    }
  }