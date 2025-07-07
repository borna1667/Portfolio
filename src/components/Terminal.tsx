import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Terminal() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(el.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  return (
    <section ref={el} className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-4 font-mono text-white">
        <div className="flex items-center pb-2 mb-2 border-b border-gray-600">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <p>&gt; npm run build</p>
        <p className="text-green-400">✓ Build complete.</p>
      </div>
    </section>
  )
} 