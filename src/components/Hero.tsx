import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles, Code, Palette, Box } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll()
  const navigate = useNavigate()
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const timeline = gsap.timeline()
    
    timeline
      .fromTo(titleRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(subtitleRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
        '-=0.8'
      )

    // Floating animation for decorative elements
    gsap.to('.floating-element', {
      y: -20,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    })
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const floatingIcons = [
    { Icon: Code, delay: 0, position: 'top-1/4 left-1/4' },
    { Icon: Palette, delay: 0.5, position: 'top-1/3 right-1/4' },
    { Icon: Sparkles, delay: 1, position: 'bottom-1/3 left-1/3' },
  ]

  return (
    <motion.section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Floating decorative elements */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className={`floating-element absolute ${position} text-blue-400/20 hidden lg:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 0.8 }}
        >
          <Icon size={48} />
        </motion.div>
      ))}
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black opacity-50" />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
            <Sparkles size={16} />
            Available for projects
          </span>
        </motion.div>

        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
            Hi, I'm{' '}
          </span>
          <motion.span 
            className="text-white relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Borna
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-30"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </motion.span>
        </motion.h1>
        
        <motion.p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            Full Stack Developer
          </motion.span>
          {' & '}
          <motion.span
            className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1.5
            }}
          >
            3D Artist
          </motion.span>
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          A passionate full-stack developer and cybersecurity enthusiast specializing in secure application 
          development and cloud security. I also create stunning 3D animations and visualizations with Blender.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="relative group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ 
                x: ['-100%', '100%'],
                transition: { duration: 1.5, repeat: Infinity, repeatDelay: 3 }
              }}
            />
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/blender')}
            className="relative group bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-medium overflow-hidden flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box size={20} />
            <span className="relative z-10">Blender Projects</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ 
                x: ['-100%', '100%'],
                transition: { duration: 1.5, repeat: Infinity, repeatDelay: 4 }
              }}
            />
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/contact')}
            className="relative group border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-medium overflow-hidden"
            whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 group-hover:text-white transition-colors">Get in Touch</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="cursor-pointer flex flex-col items-center"
          onClick={scrollToAbout}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.div>
          <motion.div
            className="w-0.5 h-16 bg-gradient-to-b from-blue-400 to-transparent mt-2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
} 