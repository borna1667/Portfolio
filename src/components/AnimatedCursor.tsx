
import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'text' | 'pointer' | 'loading'>('default')
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  
  const prevPosition = useRef({ x: 0, y: 0 })
  const trailLength = 8
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      
      // Calculate velocity
      const deltaX = newPosition.x - prevPosition.current.x
      const deltaY = newPosition.y - prevPosition.current.y
      setVelocity({ x: deltaX, y: deltaY })
      
      setMousePosition(newPosition)
      cursorX.set(newPosition.x)
      cursorY.set(newPosition.y)
      
      // Update trail
      setTrail(prev => {
        const newTrail = [
          { x: newPosition.x, y: newPosition.y, timestamp: Date.now() },
          ...prev.slice(0, trailLength - 1)
        ]
        return newTrail
      })
      
      prevPosition.current = newPosition
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true)
        setCursorVariant('pointer')
      } else if (target.closest('input, textarea, [contenteditable]')) {
        setIsHovering(true)
        setCursorVariant('text')
      } else if (target.closest('.loading')) {
        setIsHovering(true)
        setCursorVariant('loading')
      } else {
        setIsHovering(false)
        setCursorVariant('default')
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  const getCursorStyles = () => {
    const baseStyles = "fixed top-0 left-0 pointer-events-none z-50 rounded-full"
    
    switch (cursorVariant) {
      case 'pointer':
        return `${baseStyles} w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 opacity-30`
      case 'text':
        return `${baseStyles} w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 opacity-50`
      case 'loading':
        return `${baseStyles} w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 opacity-40`
      default:
        return `${baseStyles} w-4 h-4 bg-white mix-blend-difference`
    }
  }

  const getTrailColor = (index: number) => {
    const opacity = (1 - index / trailLength) * 0.6
    const hue = (Date.now() / 20 + index * 10) % 360
    return `hsla(${hue}, 70%, 60%, ${opacity})`
  }

  return (
    <>
      {/* Dynamic gradient background effect */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-40"
        style={{
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      />

      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={`${point.timestamp}-${index}`}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-49"
          style={{
            backgroundColor: getTrailColor(index),
          }}
          initial={{ 
            x: point.x - 1, 
            y: point.y - 1,
            scale: 1,
            opacity: 1
          }}
          animate={{
            x: point.x - 1,
            y: point.y - 1,
            scale: 1 - (index / trailLength) * 0.8,
            opacity: 1 - (index / trailLength),
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className={getCursorStyles()}
        animate={{
          x: mousePosition.x - (cursorVariant === 'pointer' ? 24 : cursorVariant === 'text' ? 12 : cursorVariant === 'loading' ? 16 : 8),
          y: mousePosition.y - (cursorVariant === 'pointer' ? 24 : cursorVariant === 'text' ? 12 : cursorVariant === 'loading' ? 16 : 8),
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
          rotate: cursorVariant === 'loading' ? 360 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5,
          rotate: cursorVariant === 'loading' ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.2 }
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 border-2 rounded-full pointer-events-none z-50"
        style={{
          borderColor: isHovering ? '#8b5cf6' : '#3b82f6',
          borderStyle: 'solid',
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          scale: isClicking ? 0.8 : 1,
          opacity: cursorVariant === 'default' ? 0.6 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.2,
        }}
      />

      {/* Velocity-based streaks */}
      {Math.abs(velocity.x) > 5 || Math.abs(velocity.y) > 5 ? (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-48"
          style={{
            width: Math.abs(velocity.x) * 2,
            height: 2,
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8), transparent)',
            transformOrigin: '0 50%',
            rotate: Math.atan2(velocity.y, velocity.x) * (180 / Math.PI),
          }}
          initial={{ opacity: 0 }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y - 1,
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        />
      ) : null}

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 border-2 border-blue-400 rounded-full pointer-events-none z-48"
          initial={{
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            width: 20,
            height: 20,
            opacity: 1,
          }}
          animate={{
            width: 80,
            height: 80,
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      )}
    </>
  )
}

export default AnimatedCursor
