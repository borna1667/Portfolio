import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.fromTo('.project-card', 
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

  const projects = [
    {
      title: "Portfolio",
      description: "Modern and responsive portfolio website built with React, TypeScript, and advanced animations showcasing my development skills and projects",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
      stars: 0,
      status: "In Development",
      image: "/api/placeholder/400/250",
      github: "https://github.com/borna1667/Portfolio",
      demo: null
    },
    {
      title: "Sheep AI Project",
      description: "An AI-powered application built with TypeScript focusing on machine learning capabilities and intelligent automation features",
      tech: ["TypeScript", "JavaScript", "CSS", "HTML"],
      stars: 0,
      status: "Completed",
      image: "/api/placeholder/400/250",
      github: "https://github.com/borna1667/Sheep-ai-project",
      demo: null
    },
    {
      title: "KeysNCaps Project",
      description: "A project focused on keyboard customization and keycap management system for mechanical keyboard enthusiasts",
      tech: ["Web Technologies"],
      stars: 0,
      status: "In Development",
      image: "/api/placeholder/400/250",
      github: "https://github.com/borna1667/Keysncaps-project",
      demo: null
    }
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            GitHub Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4"></div>
          <motion.div
            className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.open('https://github.com/borna1667', '_blank')}
          >
            <span className="text-lg font-medium">View Profile</span>
            <ExternalLink size={20} />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            >
              <div className="relative overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-600 opacity-50">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                    <Star size={12} className="text-yellow-400" />
                    <span className="text-white">{project.stars}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'In Development' 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                      : 'bg-green-500/20 text-green-300 border border-green-500/30'
                  }`}>
                    {project.status}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={() => window.open(project.github, '_blank')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                    <span className="text-sm">View Repository</span>
                  </motion.button>
                  {project.demo && (
                    <motion.button
                      onClick={() => window.open(project.demo!, '_blank')}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">View Demo</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => window.open('https://github.com/borna1667?tab=repositories', '_blank')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/25"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
