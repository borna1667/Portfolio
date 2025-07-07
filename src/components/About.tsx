import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Shield, Cloud, Database } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    timeline
      .fromTo(profileRef.current, 
        { x: -100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(contentRef.current, 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
        '-=0.5'
      )
  }, [])

  const features = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "Full Stack Development",
      description: "Building modern web applications with React, TypeScript, and Node.js"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Cybersecurity",
      description: "Implementing security best practices and vulnerability assessments"
    },
    {
      icon: <Cloud className="w-8 h-8 text-purple-400" />,
      title: "Cloud Solutions",
      description: "Deploying scalable applications on AWS, Azure, and DigitalOcean"
    },
    {
      icon: <Database className="w-8 h-8 text-orange-400" />,
      title: "Database Design",
      description: "Designing efficient database schemas and optimizing queries"
    }
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            ref={profileRef}
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl opacity-20"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-4 border border-gray-700">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <div className="text-6xl font-bold text-white">B</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={contentRef}
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-lg text-gray-300 leading-relaxed space-y-4">
              <p>
                Based in <span className="text-blue-400 font-semibold">Zagreb, Croatia</span>, I'm a passionate developer 
                who loves creating secure, efficient, and user-friendly applications. My journey in technology started 
                with a curiosity about how things work under the hood.
              </p>
              <p>
                I specialize in building modern web applications using the latest technologies, with a strong focus on 
                security and performance. Whether it's developing a complex backend system or crafting an intuitive 
                user interface, I bring dedication and expertise to every project.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                Available for Projects
              </span>
              <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                Response within 24 hours
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
