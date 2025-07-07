import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Hero() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(el.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  return (
    <section ref={el} className="min-h-screen flex items-center justify-center">
      <h1 className="text-6xl font-bold tracking-wide">Welcome to my Digital Canvas</h1>
    </section>
  )
} 