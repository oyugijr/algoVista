// components/core/StepExplanation.tsx
'use client'

import { useSorting } from '@/components/providers/SortingProvider'
import type { AlgorithmKey } from '@/lib/algorithms'

type Explanations = {
  [key in AlgorithmKey]: {
    [lineNumber: number]: string
  }
}

const EXPLANATIONS: Explanations = {
  bubble: {
    0: "Initializing bubble sort algorithm",
    2: "Starting outer loop iteration through all elements",
    3: "Comparing adjacent elements in unsorted portion",
    4: "Elements are out of order - swap needed",
    5: "Swapping elements to correct order"
  },
  selection: {
    0: "Initializing selection sort algorithm",
    2: "Starting new iteration to find minimum element",
    3: "Setting current position as temporary minimum",
    4: "Scanning remaining elements for smaller value",
    5: "Found new minimum element - updating position",
    6: "Swapping current element with minimum element"
  },
  insertion: {
    0: "Initializing insertion sort algorithm",
    2: "Selecting next element to insert",
    3: "Setting insertion point in sorted portion",
    4: "Comparing with previous elements in sorted portion",
    5: "Shifting larger elements to the right",
    6: "Adjusting insertion point for current element",
    7: "Placing current element in correct position"
  },
  quick: {
    0: "Initializing quick sort algorithm",
    1: "Checking if subarray needs sorting",
    2: "Partitioning array around pivot element",
    7: "Selecting pivot element (last element)",
    8: "Initializing partition index pointer",
    9: "Scanning elements for proper placement",
    10: "Found element smaller than pivot - swapping",
    11: "Moving partition index pointer",
    12: "Placing pivot in final sorted position",
    13: "Recursively sorting left partition",
    14: "Recursively sorting right partition"
  },
  merge: {
    0: "Initializing merge sort algorithm",
    1: "Checking base case for recursion",
    2: "Calculating mid-point of current array",
    3: "Recursively sorting left half of array",
    4: "Recursively sorting right half of array",
    5: "Merging sorted halves together",
    7: "Initializing merge operation",
    8: "Comparing elements from both halves",
    9: "Selecting smaller element for merged array",
    10: "Moving to next element in selected half",
    11: "Copying remaining elements from left half",
    12: "Copying remaining elements from right half"
  }
}

export const StepExplanation = () => {
  const { algorithm, pseudocodeLine } = useSorting()

  return (
    <div className="p-4 bg-gray-800 rounded-lg h-full">
      <h3 className="text-lg font-bold mb-2 text-white">Step Explanation</h3>
      <p className="text-gray-300 min-h-[80px]">
        {EXPLANATIONS[algorithm]?.[pseudocodeLine] || 
          "Hover over pseudocode lines or watch the visualization for step-by-step explanations"}
      </p>
      <div className="mt-4 text-sm text-gray-400">
        <span className="font-medium">Current Algorithm:</span> {algorithm}
        <br />
        <span className="font-medium">Current Line:</span> {pseudocodeLine}
      </div>
    </div>
  )
}