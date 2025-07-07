import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import LoadingScreen from './LoadingScreen'
import Header from './Header'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'
import NetworkBackground from './NetworkBackground'
import FloatingActions from './FloatingActions'

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)

    // Enhanced scroll animations
    gsap.registerPlugin(ScrollTrigger)
    
    // Smooth reveal animations for sections
    gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <LoadingScreen />
      <div className="relative bg-gray-950 text-white overflow-hidden">
        <NetworkBackground />
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <FloatingActions />
      </div>
    </>
  )
}
