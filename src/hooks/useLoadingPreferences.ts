// Hook for managing loading screen preferences
import { useState, useEffect } from 'react'

interface LoadingPreferences {
  skipLoadingScreen: boolean
  reducedAnimations: boolean
  visitCount: number
}

const DEFAULT_PREFERENCES: LoadingPreferences = {
  skipLoadingScreen: false,
  reducedAnimations: false,
  visitCount: 0
}

export const useLoadingPreferences = () => {
  const [preferences, setPreferences] = useState<LoadingPreferences>(DEFAULT_PREFERENCES)

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('portfolio-loading-preferences')
    let loadedPreferences = DEFAULT_PREFERENCES
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        loadedPreferences = { ...DEFAULT_PREFERENCES, ...parsed }
      } catch (error) {
        console.warn('Failed to parse loading preferences:', error)
      }
    }

    // Increment visit count
    loadedPreferences.visitCount = (loadedPreferences.visitCount || 0) + 1
    
    // Auto-skip loading screen after 3 visits for better UX
    if (loadedPreferences.visitCount > 3) {
      loadedPreferences.skipLoadingScreen = true
    }

    setPreferences(loadedPreferences)

    // Save updated preferences
    localStorage.setItem('portfolio-loading-preferences', JSON.stringify(loadedPreferences))

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setPreferences(prev => ({ ...prev, reducedAnimations: true }))
    }
  }, [])

  const updatePreferences = (updates: Partial<LoadingPreferences>) => {
    const newPreferences = { ...preferences, ...updates }
    setPreferences(newPreferences)
    localStorage.setItem('portfolio-loading-preferences', JSON.stringify(newPreferences))
  }

  return {
    preferences,
    updatePreferences,
    skipLoadingScreen: preferences.skipLoadingScreen,
    reducedAnimations: preferences.reducedAnimations,
    visitCount: preferences.visitCount
  }
}
