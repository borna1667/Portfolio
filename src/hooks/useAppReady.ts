// Hook for detecting when the app is actually ready
import { useState, useEffect } from 'react'

export const useAppReady = () => {
  const [isReady, setIsReady] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Helper function to create timeout promise
    const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), ms)
      )
      return Promise.race([promise, timeout])
    }

    const tasks = [
      // Check if fonts are loaded with timeout
      () => withTimeout(document.fonts.ready, 2000).catch(() => {
        console.warn('Font loading timed out, continuing...')
      }),
      
      // Check if critical images are loaded (only visible/above-fold images)
      () => new Promise<void>((resolve) => {
        const images = document.querySelectorAll('img[data-critical], img:not([loading="lazy"])')
        if (images.length === 0) {
          resolve()
          return
        }

        let loadedCount = 0
        const targetCount = Math.min(images.length, 5) // Only wait for first 5 critical images
        
        const checkComplete = () => {
          loadedCount++
          setLoadingProgress(Math.min((loadedCount / targetCount) * 40, 40)) // 40% for critical images
          if (loadedCount >= targetCount) {
            resolve()
          }
        }

        // Set timeout to prevent infinite waiting
        const timeoutId = setTimeout(() => {
          console.warn('Image loading timeout, continuing...')
          resolve()
        }, 3000)

        let processed = 0
        images.forEach((element) => {
          if (processed >= targetCount) return
          processed++
          
          const img = element as HTMLImageElement
          if (img.complete) {
            checkComplete()
          } else {
            img.addEventListener('load', checkComplete, { once: true })
            img.addEventListener('error', checkComplete, { once: true })
          }
        })

        // Clear timeout if all images load quickly
        if (loadedCount >= targetCount) {
          clearTimeout(timeoutId)
        }
      }),

      // Quick DOM ready check (often already complete in React)
      () => new Promise<void>((resolve) => {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          resolve()
        } else {
          const handler = () => {
            resolve()
            window.removeEventListener('DOMContentLoaded', handler)
          }
          window.addEventListener('DOMContentLoaded', handler, { once: true })
          // Fallback timeout
          setTimeout(resolve, 1000)
        }
      }),

      // Reduced minimum time delay for better UX
      () => new Promise<void>((resolve) => {
        setTimeout(resolve, 500) // Reduced from 800ms to 500ms (37.5% faster)
      })
    ]

    let completedTasks = 0
    const totalTasks = tasks.length

    const runTasks = async () => {
      try {
        // Use allSettled to not fail if one task fails
        await Promise.allSettled(tasks.map(async (task, index) => {
          try {
            await task()
            completedTasks++
            setLoadingProgress((completedTasks / totalTasks) * 100)
          } catch (error) {
            console.warn(`Loading task ${index} failed:`, error)
            // Still count as completed to prevent blocking
            completedTasks++
            setLoadingProgress((completedTasks / totalTasks) * 100)
          }
        }))
        
        setIsReady(true)
      } catch (error) {
        console.warn('Loading task failed:', error)
        // Still mark as ready to prevent infinite loading
        setIsReady(true)
      }
    }

    runTasks()
  }, [])

  return { isReady, loadingProgress }
}
