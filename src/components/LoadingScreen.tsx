import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing...')
  const [glitchActive, setGlitchActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const loadingTexts = [
    'Initializing Neural Network...',
    'Compiling Reality Matrix...',
    'Loading Quantum Particles...',
    'Synchronizing Dimensions...',
    'Calibrating Holograms...',
    'Activating Experience...',
    'Welcome to the Future!'
  ]

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    let textIndex = 0
    const textTimer = setInterval(() => {
      if (textIndex < loadingTexts.length - 1) {
        setLoadingText(loadingTexts[textIndex])
        textIndex++
      }
    }, 500)

    // Reduce glitch frequency on mobile
    const glitchTimer = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 150)
    }, isMobile ? 5000 + Math.random() * 5000 : 2000 + Math.random() * 3000)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          clearInterval(textTimer)
          clearInterval(glitchTimer)
          setLoadingText('Welcome to the Future!')
          setTimeout(() => setIsLoading(false), 1200)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 140)

    return () => {
      clearInterval(timer)
      clearInterval(textTimer)
      clearInterval(glitchTimer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #0f172a 0%, #000 100%)'
          }}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)'
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Advanced background with moving grid - Simplified for mobile */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: isMobile ? '40px 40px' : '50px 50px'
              }}
              animate={!isMobile ? {
                backgroundPosition: ['0px 0px', '50px 50px'],
              } : {}}
              transition={!isMobile ? {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              } : {}}
            />
          </div>
          
          {/* Holographic scan lines - Reduced on mobile */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, ${isMobile ? '0.02' : '0.03'}) 2px,
                rgba(0, 255, 255, ${isMobile ? '0.02' : '0.03'}) 4px
              )`
            }}
            animate={!isMobile ? {
              opacity: [0.3, 0.1, 0.3],
            } : { opacity: 0.2 }}
            transition={!isMobile ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          />

          {/* Floating geometric particles - Reduced count on mobile */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(isMobile ? 6 : 15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                  rotate: 0,
                  opacity: 0
                }}
                animate={!isMobile ? {
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: -100,
                  rotate: 360,
                  opacity: [0, 0.6, 0],
                } : {
                  y: -100,
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: isMobile ? 12 : 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * (isMobile ? 0.8 : 0.3),
                  ease: "linear"
                }}
              >
                <div 
                  className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} border border-cyan-400/50`}
                  style={{
                    background: Math.random() > 0.5 ? 'transparent' : 'rgba(34, 211, 238, 0.1)',
                    transform: `rotate(${Math.random() * 45}deg)`
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Central hologram container */}
          <div className="relative z-10 text-center">
            {/* Holographic frame */}
            <motion.div
              className={`relative ${isMobile ? 'p-8' : 'p-12'} border border-cyan-400/30 rounded-lg backdrop-blur-sm`}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                boxShadow: `
                  inset 0 0 50px rgba(34, 211, 238, 0.1),
                  0 0 50px rgba(34, 211, 238, 0.2)
                `
              }}
              animate={!isMobile ? {
                boxShadow: [
                  `inset 0 0 50px rgba(34, 211, 238, 0.1), 0 0 50px rgba(34, 211, 238, 0.2)`,
                  `inset 0 0 50px rgba(34, 211, 238, 0.2), 0 0 80px rgba(34, 211, 238, 0.3)`,
                  `inset 0 0 50px rgba(34, 211, 238, 0.1), 0 0 50px rgba(34, 211, 238, 0.2)`
                ]
              } : {}}
              transition={!isMobile ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
            >
              {/* Corner elements - Simplified on mobile */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${isMobile ? 'w-4 h-4' : 'w-6 h-6'} border-l-2 border-t-2 border-cyan-400`}
                  style={{
                    top: i < 2 ? -2 : 'auto',
                    bottom: i >= 2 ? -2 : 'auto',
                    left: i % 2 === 0 ? -2 : 'auto',
                    right: i % 2 === 1 ? -2 : 'auto',
                    transform: `rotate(${i * 90}deg)`
                  }}
                  animate={!isMobile ? {
                    opacity: [0.3, 1, 0.3],
                  } : { opacity: 0.6 }}
                  transition={!isMobile ? {
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  } : {}}
                />
              ))}

              {/* Logo with advanced effects */}
              <motion.div
                className={`relative ${isMobile ? 'mb-6' : 'mb-8'}`}
                initial={{ scale: 0, rotateY: -180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.div
                  className={`${isMobile ? 'text-6xl' : 'text-8xl'} font-bold relative ${glitchActive ? 'animate-pulse' : ''}`}
                  style={{
                    background: 'linear-gradient(45deg, #00ffff, #0080ff, #8000ff, #00ffff)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: glitchActive ? 'hue-rotate(180deg) saturate(2)' : 'none',
                    textShadow: glitchActive ? 
                      '2px 0 #ff00ff, -2px 0 #00ffff' : 
                      '0 0 30px rgba(0, 255, 255, 0.5)'
                  }}
                  animate={!isMobile ? { 
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  } : {}}
                  transition={!isMobile ? { 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : {}}
                >
                  B
                </motion.div>
                
                {/* Holographic rings - Reduced on mobile */}
                {!isMobile && [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ 
                      duration: (i + 1) * 8, 
                      repeat: Infinity, 
                      ease: "linear"
                    }}
                  >
                    <div 
                      className={`border border-cyan-400/20 rounded-full`}
                      style={{
                        width: `${120 + i * 20}px`,
                        height: `${120 + i * 20}px`,
                        background: `conic-gradient(from 0deg, transparent, rgba(34, 211, 238, ${0.1 - i * 0.02}), transparent)`
                      }}
                    >
                      <motion.div
                        className="w-1 h-1 bg-cyan-400 rounded-full"
                        animate={{ rotate: i % 2 === 0 ? -360 : 360 }}
                        transition={{ 
                          duration: (i + 1) * 8, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
                
                {/* Simplified mobile version */}
                {isMobile && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      ease: "linear"
                    }}
                  >
                    <div 
                      className="border border-cyan-400/30 rounded-full w-32 h-32"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, rgba(34, 211, 238, 0.1), transparent)`
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
              
              {/* Advanced progress system */}
              <div className={`space-y-4 ${isMobile ? 'mb-4' : 'mb-6'}`}>
                {/* Main progress bar */}
                <div className={`relative ${isMobile ? 'w-64 h-3' : 'w-80 h-4'} bg-gray-800/50 rounded-full overflow-hidden border border-cyan-400/20`}>
                  <motion.div
                    className="h-full relative rounded-full"
                    style={{
                      background: `linear-gradient(90deg, 
                        rgba(0, 255, 255, 0.8) 0%, 
                        rgba(0, 128, 255, 0.8) 50%, 
                        rgba(128, 0, 255, 0.8) 100%
                      )`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Scanning light effect - Simplified on mobile */}
                    {!isMobile && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Progress markers */}
                  {[25, 50, 75].map((marker) => (
                    <div
                      key={marker}
                      className="absolute top-0 bottom-0 w-px bg-cyan-400/40"
                      style={{ left: `${marker}%` }}
                    />
                  ))}
                </div>

                {/* Sub-progress bars - Simplified on mobile */}
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-1 bg-gray-800/50 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: progress > i * 25 ? 1 : 0.3 }}
                    >
                      <motion.div
                        className="h-full bg-cyan-400/60 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: progress > i * 25 ? '100%' : '0%' 
                        }}
                        transition={{ 
                          delay: i * 0.2,
                          duration: 0.5 
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Progress percentage with glitch effect */}
              <motion.div
                className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-cyan-400 mb-4 font-mono`}
                key={Math.floor(progress)}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  filter: glitchActive ? 'blur(1px)' : 'none',
                  textShadow: glitchActive ? 
                    '1px 0 #ff00ff, -1px 0 #00ffff' : 
                    '0 0 10px rgba(0, 255, 255, 0.8)'
                }}
              >
                {Math.round(progress).toString().padStart(3, '0')}%
              </motion.div>
              
              {/* Loading text with typewriter effect */}
              <motion.div
                className={`relative ${isMobile ? 'h-6' : 'h-8'}`}
                key={loadingText}
              >
                <motion.p
                  className={`text-gray-300 ${isMobile ? 'text-base' : 'text-lg'} font-medium font-mono absolute inset-0 flex items-center justify-center`}
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)',
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                  }}
                >
                  {loadingText}
                </motion.p>
              </motion.div>
              
              {/* Animated dots with unique pattern - Simplified on mobile */}
              <div className={`flex justify-center ${isMobile ? 'mt-4' : 'mt-6'} space-x-3`}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: `hsl(${180 + i * 20}, 100%, 60%)`
                    }}
                    animate={!isMobile ? {
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 1, 0.3],
                      boxShadow: [
                        '0 0 5px rgba(0, 255, 255, 0.3)',
                        '0 0 15px rgba(0, 255, 255, 0.8)',
                        '0 0 5px rgba(0, 255, 255, 0.3)'
                      ]
                    } : {
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: isMobile ? 1.2 : 1.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Status indicators - Simplified on mobile */}
            <motion.div
              className={`absolute ${isMobile ? '-bottom-12' : '-bottom-16'} left-1/2 transform -translate-x-1/2 flex ${isMobile ? 'flex-col space-y-2' : 'space-x-6'} text-xs text-cyan-400/60 font-mono`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={!isMobile ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.8 }}
                  transition={!isMobile ? { duration: 1, repeat: Infinity } : {}}
                />
                <span>SYSTEM ONLINE</span>
              </div>
              {!isMobile && (
                <>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span>NEURAL NET ACTIVE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span>QUANTUM READY</span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
