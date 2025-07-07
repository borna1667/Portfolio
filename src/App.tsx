import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Floating3DScene from './components/Floating3DScene'
import Terminal from './components/Terminal'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)

    return () => {
        lenis.destroy()
    }
  }, [])

  return (
    <div>
      <Hero />
      <Skills />
      <Floating3DScene />
      <Terminal />
    </div>
  )
}
