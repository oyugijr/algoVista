// hooks/use-sound.ts
import { useEffect } from 'react'

export const useSound = () => {
  const playSwapSound = () => {
    const context = new AudioContext()
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(context.destination)
    
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(880, context.currentTime)
    gainNode.gain.setValueAtTime(0.1, context.currentTime)
    
    oscillator.start()
    oscillator.stop(context.currentTime + 0.1)
  }

  const playComparisonSound = () => {
    // Similar implementation with different frequency
  }

  return { playSwapSound, playComparisonSound }
}