'use client'

import { useEffect, useState } from 'react'

export const useSound = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  
  useEffect(() => {
    // Initialize audio context on user interaction
    const init = () => {
      if (typeof window !== 'undefined' && !audioContext) {
        setAudioContext(new (window.AudioContext || window.AudioContext)())
      }
    }
    
    window.addEventListener('click', init, { once: true })
    return () => window.removeEventListener('click', init)
  }, [])

  const playTone = (frequency: number, duration = 0.1) => {
    if (!audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.type = 'square'
    oscillator.frequency.value = frequency
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + duration)
  }

  return {
    playComparisonSound: () => playTone(440),
    playSwapSound: () => playTone(880),
  }
}