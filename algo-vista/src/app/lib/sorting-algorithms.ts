const createAnimation = (type: string, data: any) => {
  return { type, ...data }
}

// Bubble Sort
export function bubbleSort(array: number[], animations: any[]) {
  const n = array.length
  let swapped

  for (let i = 0; i < n; i++) {
    swapped = false

    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      animations.push(createAnimation("compare", { indices: [j, j + 1] }))

      if (array[j] > array[j + 1]) {
        // Swap elements
        animations.push(createAnimation("swap", { indices: [j, j + 1] }))

        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp

        swapped = true
      }
    }

    // Mark the last element of this pass as sorted
    animations.push(createAnimation("sorted", { indices: [n - i - 1] }))

    // If no swapping occurred in this pass, the array is sorted
    if (!swapped) {
      // Mark all remaining elements as sorted
      const remainingIndices = Array.from({ length: n - i - 1 }, (_, idx) => idx)
      if (remainingIndices.length > 0) {
        animations.push(createAnimation("sorted", { indices: remainingIndices }))
      }
      break
    }
  }

  return array
}

// Selection Sort
export function selectionSort(array: number[], animations: any[]) {
  const n = array.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i

    // Find the minimum element in the unsorted part
    for (let j = i + 1; j < n; j++) {
      animations.push(createAnimation("compare", { indices: [minIndex, j] }))

      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }

    // Swap the found minimum element with the first element of the unsorted part
    if (minIndex !== i) {
      animations.push(createAnimation("swap", { indices: [i, minIndex] }))

      const temp = array[i]
      array[i] = array[minIndex]
      array[minIndex] = temp
    }

    // Mark the current position as sorted
    animations.push(createAnimation("sorted", { indices: [i] }))
  }

  // Mark the last element as sorted
  animations.push(createAnimation("sorted", { indices: [n - 1] }))

  return array
}

// Insertion Sort
export function insertionSort(array: number[], animations: any[]) {
  const n = array.length

  // Mark the first element as sorted
  animations.push(createAnimation("sorted", { indices: [0] }))

  for (let i = 1; i < n; i++) {
    const key = array[i]
    let j = i - 1

    // Compare key with each element on the left until a smaller element is found
    while (j >= 0) {
      animations.push(createAnimation("compare", { indices: [j, j + 1] }))

      if (array[j] > key) {
        animations.push(createAnimation("swap", { indices: [j, j + 1] }))
        array[j + 1] = array[j]
        j--
      } else {
        break
      }
    }

    // Place key at the correct position
    array[j + 1] = key

    // Mark the current position as sorted
    animations.push(createAnimation("sorted", { indices: [i] }))
  }

  return array
}

// Merge Sort
export function mergeSort(array: number[], animations: any[]) {
  const auxiliaryArray = array.slice()
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations)
  return array
}

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: any[],
) {
  if (startIdx === endIdx) {
    animations.push(createAnimation("sorted", { indices: [startIdx] }))
    return
  }

  const middleIdx = Math.floor((startIdx + endIdx) / 2)

  // Sort left half
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations)

  // Sort right half
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations)

  // Merge the sorted halves
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations)
}

function merge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: any[],
) {
  let i = startIdx
  let j = middleIdx + 1
  let k = startIdx

  while (i <= middleIdx && j <= endIdx) {
    // Compare elements from both halves
    animations.push(createAnimation("compare", { indices: [i, j] }))

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Overwrite value at index k in the original array
      animations.push(createAnimation("overwrite", { index: k, value: auxiliaryArray[i] }))
      mainArray[k++] = auxiliaryArray[i++]
    } else {
      // Overwrite value at index k in the original array
      animations.push(createAnimation("overwrite", { index: k, value: auxiliaryArray[j] }))
      mainArray[k++] = auxiliaryArray[j++]
    }
  }

  // Copy remaining elements from left half
  while (i <= middleIdx) {
    animations.push(createAnimation("overwrite", { index: k, value: auxiliaryArray[i] }))
    mainArray[k++] = auxiliaryArray[i++]
  }

  // Copy remaining elements from right half
  while (j <= endIdx) {
    animations.push(createAnimation("overwrite", { index: k, value: auxiliaryArray[j] }))
    mainArray[k++] = auxiliaryArray[j++]
  }

  // Mark the merged section as sorted
  const sortedIndices = Array.from({ length: endIdx - startIdx + 1 }, (_, idx) => startIdx + idx)
  animations.push(createAnimation("sorted", { indices: sortedIndices }))
}

// Quick Sort
export function quickSort(array: number[], animations: any[]) {
  quickSortHelper(array, 0, array.length - 1, animations)
  return array
}

function quickSortHelper(array: number[], low: number, high: number, animations: any[]) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(array, low, high, animations)

    // Sort the elements before and after the pivot
    quickSortHelper(array, low, pivotIndex - 1, animations)
    quickSortHelper(array, pivotIndex + 1, high, animations)
  } else if (low === high) {
    // Single element is already sorted
    animations.push(createAnimation("sorted", { indices: [low] }))
  }
}

function partition(array: number[], low: number, high: number, animations: any[]) {
  // Choose the rightmost element as the pivot
  const pivot = array[high]
  animations.push(createAnimation("pivot", { index: high }))

  let i = low - 1

  // Compare each element with the pivot
  for (let j = low; j < high; j++) {
    animations.push(createAnimation("compare", { indices: [j, high] }))

    if (array[j] <= pivot) {
      i++

      // Swap elements
      if (i !== j) {
        animations.push(createAnimation("swap", { indices: [i, j] }))

        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  }

  // Swap the pivot element with the element at (i + 1)
  if (i + 1 !== high) {
    animations.push(createAnimation("swap", { indices: [i + 1, high] }))

    const temp = array[i + 1]
    array[i + 1] = array[high]
    array[high] = temp
  }

  // Mark the pivot as sorted
  animations.push(createAnimation("sorted", { indices: [i + 1] }))

  return i + 1
}

// Heap Sort
export function heapSort(array: number[], animations: any[]) {
  const n = array.length

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations)
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to the end
    animations.push(createAnimation("swap", { indices: [0, i] }))

    const temp = array[0]
    array[0] = array[i]
    array[i] = temp

    // Mark the current position as sorted
    animations.push(createAnimation("sorted", { indices: [i] }))

    // Call heapify on the reduced heap
    heapify(array, i, 0, animations)
  }

  // Mark the first element as sorted
  animations.push(createAnimation("sorted", { indices: [0] }))

  return array
}

function heapify(array: number[], n: number, i: number, animations: any[]) {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  // Compare with left child
  if (left < n) {
    animations.push(createAnimation("compare", { indices: [largest, left] }))

    if (array[left] > array[largest]) {
      largest = left
    }
  }

  // Compare with right child
  if (right < n) {
    animations.push(createAnimation("compare", { indices: [largest, right] }))

    if (array[right] > array[largest]) {
      largest = right
    }
  }

  // If largest is not the root
  if (largest !== i) {
    animations.push(createAnimation("swap", { indices: [i, largest] }))

    const temp = array[i]
    array[i] = array[largest]
    array[largest] = temp

    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, animations)
  }
}

// Radix Sort
export function radixSort(array: number[], animations: any[]) {
  // Find the maximum number to know the number of digits
  const max = Math.max(...array)

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(array, exp, animations)
  }

  // Mark all elements as sorted
  animations.push(createAnimation("sorted", { indices: Array.from({ length: array.length }, (_, i) => i) }))

  return array
}

function countingSort(array: number[], exp: number, animations: any[]) {
  const n = array.length
  const output = new Array(n).fill(0)
  const count = new Array(10).fill(0)

  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(array[i] / exp) % 10
    count[digit]++
  }

  // Change count[i] so that count[i] now contains actual position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1]
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10

    // Compare the current element with its position in the output array
    animations.push(createAnimation("compare", { indices: [i, count[digit] - 1] }))

    output[count[digit] - 1] = array[i]
    count[digit]--
  }

  // Copy the output array to the original array
  for (let i = 0; i < n; i++) {
    if (array[i] !== output[i]) {
      animations.push(createAnimation("overwrite", { index: i, value: output[i] }))
      array[i] = output[i]
    }
  }
}

