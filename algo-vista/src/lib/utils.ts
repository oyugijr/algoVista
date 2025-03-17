/**
 * Generates arrays for visualization with different initial states
 * @param size - Number of elements in array
 * @param type - Array initialization type
 * @returns Generated array of numbers
 */
export const generateArray = (
  size: number,
  type: 'random' | 'sorted' | 'reversed' | 'nearly-sorted' = 'random'
): number[] => {
  const base = Array.from({ length: size }, (_, i) => 
    Math.floor((i + 1) * (100 / size))
  );
  
  switch (type) {
    case 'sorted': return base
    case 'reversed': return [...base].reverse()
    case 'nearly-sorted':
      return base.map((val, i) => 
        i % 5 === 0 ? val + Math.random() * 10 - 5 : val)
    default: return shuffleArray(base)
  }
}

const shuffleArray = (array: number[]): number[] => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

/**
 * Calculates delay duration based on speed setting
 * @param speed - User's speed setting (1-100)
 * @returns Delay in milliseconds
 */
export const getDelay = (speed: number): number => {
  return Math.max(10, 110 - speed)
}