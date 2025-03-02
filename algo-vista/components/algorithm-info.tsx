import { Card, CardContent } from "@/components/ui/card"

interface AlgorithmInfoProps {
  algorithm: string
}

export default function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
  const algorithmData = {
    bubbleSort: {
      name: "Bubble Sort",
      description:
        "Bubble Sort is a simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
      steps: [
        "Start at the beginning of the array",
        "Compare adjacent elements. If the first is greater than the second, swap them",
        "Move to the next pair of elements and repeat step 2",
        "After reaching the end of the array, start again from the beginning",
        "Repeat until no more swaps are needed",
      ],
      bestCase: "O(n) - when the array is already sorted",
      averageCase: "O(n²)",
      worstCase: "O(n²) - when the array is sorted in reverse order",
      spaceComplexity: "O(1) - only requires a constant amount of additional space",
      stableSort: "Yes - equal elements maintain their relative order",
      inPlace: "Yes - doesn't require extra space proportional to the input size",
    },
    selectionSort: {
      name: "Selection Sort",
      description:
        "Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist. The algorithm repeatedly selects the smallest (or largest) element from the unsorted sublist and moves it to the end of the sorted sublist.",
      steps: [
        "Find the minimum element in the unsorted part of the array",
        "Swap it with the first element of the unsorted part",
        "Move the boundary between the sorted and unsorted parts one element to the right",
        "Repeat until the entire array is sorted",
      ],
      bestCase: "O(n²) - even if the array is already sorted, all comparisons must be made",
      averageCase: "O(n²)",
      worstCase: "O(n²)",
      spaceComplexity: "O(1) - only requires a constant amount of additional space",
      stableSort: "No - equal elements may change their relative order",
      inPlace: "Yes - doesn't require extra space proportional to the input size",
    },
    insertionSort: {
      name: "Insertion Sort",
      description:
        "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort, but it provides several advantages: simple implementation, efficient for small data sets, adaptive, stable, and in-place.",
      steps: [
        "Start with the second element (assume the first element is already sorted)",
        "Compare the current element with the previous elements",
        "If the previous element is greater, move it one position up",
        "Repeat step 3 until finding the correct position for the current element",
        "Insert the current element in its correct position",
        "Move to the next element and repeat steps 2-5 until the entire array is sorted",
      ],
      bestCase: "O(n) - when the array is already sorted",
      averageCase: "O(n²)",
      worstCase: "O(n²) - when the array is sorted in reverse order",
      spaceComplexity: "O(1) - only requires a constant amount of additional space",
      stableSort: "Yes - equal elements maintain their relative order",
      inPlace: "Yes - doesn't require extra space proportional to the input size",
    },
    mergeSort: {
      name: "Merge Sort",
      description:
        "Merge Sort is an efficient, stable, comparison-based, divide and conquer algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
      steps: [
        "Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted)",
        "Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining",
      ],
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n log n)",
      spaceComplexity: "O(n) - requires additional space for the temporary arrays",
      stableSort: "Yes - equal elements maintain their relative order",
      inPlace: "No - requires extra space proportional to the input size",
    },
    quickSort: {
      name: "Quick Sort",
      description:
        "Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.",
      steps: [
        "Choose a pivot element from the array",
        "Partition the array: reorder it so that elements less than the pivot come before it, and elements greater than the pivot come after it",
        "Recursively apply the above steps to the sub-arrays of elements less than and greater than the pivot",
      ],
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n²) - when the pivot selection consistently results in highly unbalanced partitions",
      spaceComplexity: "O(log n) - for the recursive call stack",
      stableSort: "No - equal elements may change their relative order",
      inPlace: "Yes - doesn't require extra space proportional to the input size",
    },
    heapSort: {
      name: "Heap Sort",
      description:
        "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving it to the sorted region.",
      steps: [
        "Build a max heap from the input data",
        "Swap the root (maximum value) with the last element of the heap",
        "Reduce the heap size by 1 and heapify the root",
        "Repeat steps 2 and 3 until the heap size is 1",
      ],
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n log n)",
      spaceComplexity: "O(1) - only requires a constant amount of additional space",
      stableSort: "No - equal elements may change their relative order",
      inPlace: "Yes - doesn't require extra space proportional to the input size",
    },
    radixSort: {
      name: "Radix Sort",
      description:
        "Radix Sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same significant position and value. It processes the digits of the numbers from the least significant digit to the most significant digit.",
      steps: [
        "Find the maximum number to know the number of digits",
        "For each digit position, starting from the least significant digit:",
        "Sort the elements based on the current digit position using a stable sort (usually counting sort)",
        "Repeat until all digit positions are processed",
      ],
      bestCase: "O(nk) - where k is the number of digits in the largest number",
      averageCase: "O(nk)",
      worstCase: "O(nk)",
      spaceComplexity: "O(n+k) - where n is the number of elements and k is the range of input",
      stableSort: "Yes - equal elements maintain their relative order",
      inPlace: "No - requires extra space proportional to the input size",
    },
  }

  const info = algorithmData[algorithm as keyof typeof algorithmData]

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-xl font-bold">{info.name}</h2>
        <p className="mt-2">{info.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">How It Works</h3>
        <ol className="mt-2 list-decimal pl-5">
          {info.steps.map((step, index) => (
            <li key={index} className="mt-1">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Time Complexity</h3>
            <div className="grid gap-1">
              <div className="grid grid-cols-2">
                <span className="font-medium">Best Case:</span>
                <span>{info.bestCase}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Average Case:</span>
                <span>{info.averageCase}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Worst Case:</span>
                <span>{info.worstCase}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Properties</h3>
            <div className="grid gap-1">
              <div className="grid grid-cols-2">
                <span className="font-medium">Space Complexity:</span>
                <span>{info.spaceComplexity}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Stable Sort:</span>
                <span>{info.stableSort}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">In-Place:</span>
                <span>{info.inPlace}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

