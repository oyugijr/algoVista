// components/core/StepExplanation.tsx
'use client'

import { useSorting } from '@/components/providers/SortingProvider'

const EXPLANATIONS = {
  bubble: {
    2: "Initializing outer loop to iterate through all elements",
    3: "Comparing adjacent elements in the unsorted portion",
    4: "Swap condition met - these elements are out of order",
    5: "Performing swap operation on the selected elements"
  },
  // Add explanations for other algorithms
}

export const StepExplanation = () => {
  const [{ algorithm, currentStep }] = useSorting()
  
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Current Step Explanation</h3>
      <p className="text-gray-300">
        {EXPLANATIONS[algorithm]?.[currentStep?.line] || 
         "Hover over pseudocode lines for detailed explanations"}
      </p>
    </div>
  )
}