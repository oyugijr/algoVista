// lib/utils.ts
export const generateArray = (
  size: number,
  type: 'random' | 'sorted' | 'reversed' | 'nearly-sorted' = 'random'
) => {
  const baseArray = Array.from({ length: size }, (_, i) =>
    Math.floor((i + 1) * (100 / size))
  
  switch (type) {
    case 'sorted':
      return baseArray
    case 'reversed':
      return [...baseArray].reverse()
    case 'nearly-sorted':
      return baseArray.map((val, i) => 
        i % 5 === 0 ? val + Math.random() * 10 - 5 : val)
    default:
      return shuffleArray(baseArray)
  }
}

const shuffleArray = (array: number[]) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}