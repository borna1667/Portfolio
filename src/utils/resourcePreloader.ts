// Utility for preloading critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  if ('fonts' in document) {
    document.fonts.load('400 16px Inter').catch(() => {
      console.warn('Failed to preload Inter font')
    })
  }

  // Preload critical images that are above the fold
  const criticalImages = [
    '/keyboard-1.png',
    '/keyboard-2.png'
  ]

  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  // Preload critical CSS for faster rendering
  const criticalCSS: string[] = [
    // Add any critical CSS files here if needed
  ]

  criticalCSS.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = href
    document.head.appendChild(link)
  })
}

// Initialize resource preloading
export const initResourcePreloading = () => {
  // Use requestIdleCallback for non-blocking preloading
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadCriticalResources, { timeout: 2000 })
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(preloadCriticalResources, 100)
  }
}
