import { SortingProvider } from '@/components/providers/SortingProvider'
import { 
  ArrayVisualizer,
  ControlPanel,
  Pseudocode,
  MetricsDisplay,
  StepExplanation,
  PerformanceGraph,
  MobileControls
} from '@/components/core'

export default function Home() {
  return (
    <SortingProvider>
      <main className="min-h-screen bg-gray-900 text-white p-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Algorithm Sorting Visualizer</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Interactive visualization of sorting algorithms with real-time metrics 
              and step-by-step explanations
            </p>
          </header>

          <ControlPanel />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Visualization */}
            <div className="space-y-8">
              <ArrayVisualizer />
              <PerformanceGraph />
            </div>

            {/* Right Column - Code & Explanations */}
            <div className="space-y-8">
              <Pseudocode />
              <div className="grid grid-cols-2 gap-4">
                <MetricsDisplay />
                <StepExplanation />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-specific controls */}
        <MobileControls />
      </main>
    </SortingProvider>
  )
}