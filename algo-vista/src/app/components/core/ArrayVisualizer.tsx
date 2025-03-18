'use client'

import { motion } from 'framer-motion'
import { useSorting } from 'src/components/providers/SortingProvider'

export const ArrayVisualizer = () => {
  const [{ array, currentStep }] = useSorting()

  return (
    <div className="h-96 flex items-end gap-1 p-4 bg-gray-800 rounded-lg">
      {array.map((value, index) => (
        <motion.div
          key={index}
          className={`w-full ${ 
            currentStep?.compared?.includes(index) ? 'bg-red-500' :
            currentStep?.swapped?.includes(index) ? 'bg-blue-500' : 'bg-primary'
          }`}
          initial={false}
          animate={{ height: `${value}%` }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  )
}