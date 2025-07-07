import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.fromTo('.skill-category', 
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

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90, color: "from-green-400 to-blue-500" },
        { name: "TypeScript", level: 85, color: "from-blue-400 to-purple-500" },
        { name: "JavaScript", level: 88, color: "from-yellow-400 to-orange-500" },
        { name: "C#", level: 75, color: "from-purple-400 to-pink-500" },
        { name: "Dart", level: 70, color: "from-blue-400 to-cyan-500" },
        { name: "C++", level: 65, color: "from-red-400 to-orange-500" },
      ]
    },
    {
      title: "Web Technologies",
      skills: [
        { name: "React", level: 90, color: "from-blue-400 to-cyan-500" },
        { name: "HTML", level: 95, color: "from-orange-400 to-red-500" },
        { name: "CSS", level: 88, color: "from-blue-400 to-purple-500" },
        { name: "Tailwind CSS", level: 85, color: "from-cyan-400 to-blue-500" },
      ]
    },
    {
      title: "3D & Animation",
      skills: [
        { name: "Blender 3D", level: 80, color: "from-orange-400 to-red-500" },
        { name: "Blender Animation", level: 80, color: "from-purple-400 to-pink-500" },
      ]
    },
    {
      title: "Backend & Frameworks",
      skills: [
        { name: "Node.js", level: 85, color: "from-green-400 to-blue-500" },
        { name: "Django", level: 80, color: "from-green-400 to-blue-500" },
        { name: "Flask", level: 75, color: "from-blue-400 to-purple-500" },
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", level: 85, color: "from-blue-400 to-purple-500" },
        { name: "SQLite", level: 80, color: "from-gray-400 to-blue-500" },
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "DigitalOcean", level: 80, color: "from-blue-400 to-purple-500" },
        { name: "AWS", level: 70, color: "from-orange-400 to-red-500" },
        { name: "Azure", level: 65, color: "from-blue-400 to-cyan-500" },
      ]
    },
    {
      title: "Scripting & Shell",
      skills: [
        { name: "Batch", level: 85, color: "from-gray-400 to-blue-500" },
        { name: "PowerShell", level: 80, color: "from-blue-400 to-purple-500" },
        { name: "Bash", level: 75, color: "from-green-400 to-blue-500" },
      ]
    }
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-6 bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="skill-category bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Continuously learning and adapting to new technologies. 
            Always excited to explore emerging tools and frameworks that can enhance development efficiency and security.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 