import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, MessageSquare, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.fromTo('.contact-card', 
      { y: 50, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      value: "borna.bratranek@gmail.com",
      link: "mailto:borna.bratranek@gmail.com",
      color: "from-red-400 to-orange-500"
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: "GitHub",
      value: "borna1667",
      link: "https://github.com/borna1667",
      color: "from-gray-400 to-gray-600"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Discord",
      value: ".borna.",
      link: "https://discord.com/users/.borna.",
      color: "from-purple-400 to-indigo-500"
    }
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6 bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Interested in working together or have a question? Feel free to contact me 
            through any of these platforms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              className="contact-card group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
              onClick={() => window.open(method.link, '_blank')}
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${method.color} mb-4`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                {method.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {method.value}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-medium">Available for new projects</span>
          </div>
          <p className="text-gray-400 mb-4">Response time</p>
          <p className="text-white text-xl font-semibold mb-6">Usually within 24 hours</p>
          
          <motion.button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Send Message
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © 2024 Borna.dev. Built with React, TypeScript, and lots of ☕
          </p>
        </motion.div>
      </div>
    </section>
  )
}
