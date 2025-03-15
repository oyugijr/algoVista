import { SortingProvider } from '@/components/providers/SortingProvider'
import { ArrayVisualizer, ControlPanel, Pseudocode } from '@/components/core'

export default function Home() {
  return (
    <SortingProvider>
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center">
            Algorithm Sorting Visualizer
          </h1>
          
          <ControlPanel />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ArrayVisualizer />
            <Pseudocode />
          </div>
        </div>
      </main>
    </SortingProvider>
  )
}