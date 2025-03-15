"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react"
import AlgorithmInfo from "@/components/algorithm-info"
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  radixSort,
} from "@/lib/sorting-algorithms"

const MIN_ARRAY_SIZE = 10
const MAX_ARRAY_SIZE = 100
const DEFAULT_ARRAY_SIZE = 50
const MIN_ANIMATION_SPEED = 1
const MAX_ANIMATION_SPEED = 100
const DEFAULT_ANIMATION_SPEED = 50

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE)
  const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_ANIMATION_SPEED)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort")
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set())
  const [comparedIndices, setComparedIndices] = useState<number[]>([])
  const [swappedIndices, setSwappedIndices] = useState<number[]>([])
  const [currentPivot, setCurrentPivot] = useState<number | null>(null)
  const [isStepMode, setIsStepMode] = useState(false)
  const [stepQueue, setStepQueue] = useState<any[]>([])

  const animationRef = useRef<number | null>(null)
  const arrayRef = useRef<number[]>([])
  const sortedIndicesRef = useRef<Set<number>>(new Set())
  const comparisonsRef = useRef(0)
  const swapsRef = useRef(0)

  // Reset all sorting state variables
  const resetSortingState = useCallback(() => {
    setIsSorting(false)
    setIsPaused(false)
    setComparisons(0)
    setSwaps(0)
    setCurrentStep("")
    setSortedIndices(new Set())
    setComparedIndices([])
    setSwappedIndices([])
    setCurrentPivot(null)
    setStepQueue([])
    comparisonsRef.current = 0
    swapsRef.current = 0
    sortedIndicesRef.current = new Set()

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  // Memoize generateArray to prevent recreation on each render
  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500) + 10)
    setArray(newArray)
    arrayRef.current = newArray
    resetSortingState()
  }, [arraySize, resetSortingState]) // Only recreate if arraySize changes

  // Initialize array on component mount
  useEffect(() => {
    generateArray()
  }, [generateArray]) // Empty dependency array for mount only

  // Handle array size changes
  useEffect(() => {
    if (isSorting) return // Don't regenerate array while sorting
    generateArray()
  }, [arraySize, generateArray, isSorting]) // Regenerate when array size changes

  // Handle algorithm selection change
  const handleAlgorithmChange = (value: string) => {
    if (isSorting) return
    setSelectedAlgorithm(value)
  }

  // Start sorting visualization
  const startSorting = () => {
    if (isSorting && isPaused) {
      setIsPaused(false)
      return
    }

    if (isSorting) return

    resetSortingState()
    setIsSorting(true)

    const animations: any[] = []
    const arrayCopy = [...array]

    switch (selectedAlgorithm) {
      case "bubbleSort":
        bubbleSort(arrayCopy, animations)
        break
      case "selectionSort":
        selectionSort(arrayCopy, animations)
        break
      case "insertionSort":
        insertionSort(arrayCopy, animations)
        break
      case "mergeSort":
        mergeSort(arrayCopy, animations)
        break
      case "quickSort":
        quickSort(arrayCopy, animations)
        break
      case "heapSort":
        heapSort(arrayCopy, animations)
        break
      case "radixSort":
        radixSort(arrayCopy, animations)
        break
      default:
        break
    }

    if (isStepMode) {
      setStepQueue(animations)
    } else {
      animateSort(animations)
    }
  }

  // Animate the sorting process
  const animateSort = (animations: any[]) => {
    if (animations.length === 0) {
      setIsSorting(false)
      setSortedIndices(new Set(Array.from({ length: array.length }, (_, i) => i)))
      return
    }

    const animate = () => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const currentAnimation = animations.shift() // Take the first animation from the array

      if (!currentAnimation) {
        setIsSorting(false)
        setSortedIndices(new Set(Array.from({ length: array.length }, (_, i) => i)))
        return
      }

      switch (currentAnimation.type) {
        case "compare":
          comparisonsRef.current++
          setComparisons(comparisonsRef.current)
          setComparedIndices(currentAnimation.indices)
          setCurrentStep(`Comparing elements at indices ${currentAnimation.indices.join(" and ")}`)
          break

        case "swap":
          swapsRef.current++
          setSwaps(swapsRef.current)
          setSwappedIndices(currentAnimation.indices)
          setCurrentStep(`Swapping elements at indices ${currentAnimation.indices.join(" and ")}`)

          const newArray = [...arrayRef.current]
          const [i, j] = currentAnimation.indices
          ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
          arrayRef.current = newArray
          setArray(newArray)
          break

        case "pivot":
          setCurrentPivot(currentAnimation.index)
          setCurrentStep(`Setting pivot at index ${currentAnimation.index}`)
          break

        case "sorted":
          const newSortedIndices = new Set(sortedIndicesRef.current)
          currentAnimation.indices.forEach((index: number) => newSortedIndices.add(index))
          sortedIndicesRef.current = newSortedIndices
          setSortedIndices(newSortedIndices)
          setCurrentStep(`Marking elements at indices ${currentAnimation.indices.join(", ")} as sorted`)
          break

        case "overwrite":
          setCurrentStep(`Setting value at index ${currentAnimation.index} to ${currentAnimation.value}`)
          const overwriteArray = [...arrayRef.current]
          overwriteArray[currentAnimation.index] = currentAnimation.value
          arrayRef.current = overwriteArray
          setArray(overwriteArray)
          break
      }

      const delay = MAX_ANIMATION_SPEED + 1 - animationSpeed
      setTimeout(() => {
        setComparedIndices([])
        setSwappedIndices([])
        if (animations.length > 0) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          setIsSorting(false)
          setSortedIndices(new Set(Array.from({ length: array.length }, (_, i) => i)))
        }
      }, delay)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  // Pause the sorting animation
  const pauseSorting = () => {
    setIsPaused(true)
  }

  // Reset the array and sorting state
  const resetArray = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    generateArray()
  }

  // Take a single step in step mode
  const takeStep = () => {
    if (stepQueue.length === 0) {
      setIsSorting(false)
      setSortedIndices(new Set(Array.from({ length: array.length }, (_, i) => i)))
      return
    }

    const animation = stepQueue[0]
    setStepQueue(stepQueue.slice(1))

    if (animation.type === "compare") {
      comparisonsRef.current++
      setComparisons(comparisonsRef.current)
      setComparedIndices(animation.indices)
      setCurrentStep(`Comparing elements at indices ${animation.indices.join(" and ")}`)
    } else if (animation.type === "swap") {
      swapsRef.current++
      setSwaps(swapsRef.current)
      setSwappedIndices(animation.indices)
      setCurrentStep(`Swapping elements at indices ${animation.indices.join(" and ")}`)

      const newArray = [...arrayRef.current]
      const [i, j] = (animation.indices[(newArray[i], newArray[j])] = [newArray[j], newArray[i]])
      arrayRef.current = newArray
      setArray(newArray)
    } else if (animation.type === "pivot") {
      setCurrentPivot(animation.index)
      setCurrentStep(`Setting pivot at index ${animation.index}`)
    } else if (animation.type === "sorted") {
      const newSortedIndices = new Set(sortedIndicesRef.current)
      animation.indices.forEach((index: number) => newSortedIndices.add(index))
      sortedIndicesRef.current = newSortedIndices
      setSortedIndices(newSortedIndices)
      setCurrentStep(`Marking elements at indices ${animation.indices.join(", ")} as sorted`)
    } else if (animation.type === "overwrite") {
      setCurrentStep(`Setting value at index ${animation.index} to ${animation.value}`)
      const newArray = [...arrayRef.current]
      newArray[animation.index] = animation.value
      arrayRef.current = newArray
      setArray(newArray)
    }
  }

  // Get the color for a bar based on its state
  const getBarColor = (index: number) => {
    if (swappedIndices.includes(index)) return "bg-yellow-500"
    if (comparedIndices.includes(index)) return "bg-blue-500"
    if (index === currentPivot) return "bg-purple-500"
    if (sortedIndices.has(index)) return "bg-green-500"
    return "bg-primary"
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-end justify-center h-80 gap-1">
              {array.map((value, index) => (
                <div
                  key={index}
                  className={`${getBarColor(index)} w-full transition-height duration-100`}
                  style={{
                    height: `${(value / 500) * 100}%`,
                  }}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Algorithm</label>
                <Select
                  value={selectedAlgorithm}
                  onValueChange={handleAlgorithmChange}
                  disabled={isSorting && !isPaused}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                    <SelectItem value="selectionSort">Selection Sort</SelectItem>
                    <SelectItem value="insertionSort">Insertion Sort</SelectItem>
                    <SelectItem value="mergeSort">Merge Sort</SelectItem>
                    <SelectItem value="quickSort">Quick Sort</SelectItem>
                    <SelectItem value="heapSort">Heap Sort</SelectItem>
                    <SelectItem value="radixSort">Radix Sort</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Array Size: {arraySize}</label>
                <Slider
                  value={[arraySize]}
                  min={MIN_ARRAY_SIZE}
                  max={MAX_ARRAY_SIZE}
                  step={1}
                  onValueChange={(value) => setArraySize(value[0])}
                  disabled={isSorting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Animation Speed: {animationSpeed}</label>
                <Slider
                  value={[animationSpeed]}
                  min={MIN_ANIMATION_SPEED}
                  max={MAX_ANIMATION_SPEED}
                  step={1}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={resetArray} disabled={isSorting && !isPaused}>
                  <RotateCcw className="h-4 w-4" />
                </Button>

                {!isSorting || isPaused ? (
                  <Button onClick={startSorting} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    {isPaused ? "Resume" : "Start"}
                  </Button>
                ) : (
                  <Button onClick={pauseSorting} className="flex-1">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}

                {isStepMode && (
                  <Button onClick={takeStep} disabled={!isSorting || stepQueue.length === 0} variant="outline">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={isStepMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsStepMode(true)}
                  disabled={isSorting && !isPaused}
                  className="flex-1"
                >
                  Step Mode
                </Button>
                <Button
                  variant={!isStepMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsStepMode(false)}
                  disabled={isSorting && !isPaused}
                  className="flex-1"
                >
                  Animation Mode
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-muted rounded-md">
                  <div className="font-medium">Comparisons</div>
                  <div className="text-lg">{comparisons}</div>
                </div>
                <div className="p-2 bg-muted rounded-md">
                  <div className="font-medium">Swaps</div>
                  <div className="text-lg">{swaps}</div>
                </div>
              </div>

              <div className="p-2 bg-muted rounded-md text-sm">
                <div className="font-medium">Current Step</div>
                <div className="text-sm mt-1">{currentStep || "Not started"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="info">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Algorithm Info</TabsTrigger>
              <TabsTrigger value="complexity">Complexity Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <AlgorithmInfo algorithm={selectedAlgorithm} />
            </TabsContent>

            <TabsContent value="complexity">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-2 text-left">Algorithm</th>
                      <th className="p-2 text-left">Time Complexity (Best)</th>
                      <th className="p-2 text-left">Time Complexity (Average)</th>
                      <th className="p-2 text-left">Time Complexity (Worst)</th>
                      <th className="p-2 text-left">Space Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Bubble Sort</td>
                      <td className="p-2">O(n)</td>
                      <td className="p-2">O(n²)</td>
                      <td className="p-2">O(n²)</td>
                      <td className="p-2">O(1)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Selection Sort</td>
                      <td className="p-2">O(n²)</td>
                      <td className="p-2">O(n²)</td>
                      <td className="p-2">O(n²)</td>
                      <td className="p-2">O(1)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Insertion Sort</td>
                      <td className="p-2">O(n)</td>
                      <td className="p-2">O(n²)</td>
                      <td className="p-2">O(n²)</td>
                      <td className="p-2">O(1)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Merge Sort</td>
                      <td className="p-2">O(n log n)</td>
                      <td className="p-2">O(n log n)</td>
                      <td className="p-2">O(n log n)</td>
                      <td className="p-2">O(n)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Quick Sort</td>
                      <td className="p-2">O(n log n)</td>
                      <td className="p-2">O(n log n)</td>
                      <td className="p-2">O(n²)</td>
                      <td className="p-2">O(log n)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Heap Sort</td>
                      <td className="p-2">O(n log n)</td>
                      <td className="p-2">O(n log n)</td>
                      <td className="p-2">O(n log n)</td>
                      <td className="p-2">O(1)</td>
                    </tr>
                    <tr>
                      <td className="p-2">Radix Sort</td>
                      <td className="p-2">O(nk)</td>
                      <td className="p-2">O(nk)</td>
                      <td className="p-2">O(nk)</td>
                      <td className="p-2">O(n+k)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Where:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>n = number of elements</li>
                  <li>k = number of digits in the largest number (for Radix Sort)</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-3">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Color Legend</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary"></div>
                <span className="text-sm">Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500"></div>
                <span className="text-sm">Being Compared</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500"></div>
                <span className="text-sm">Being Swapped</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500"></div>
                <span className="text-sm">Pivot Element</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500"></div>
                <span className="text-sm">Sorted</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

