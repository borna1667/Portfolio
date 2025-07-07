import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Layers, Zap, Sparkles, Code, X } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  images: string[];
  tags: string[];
  software: string[];
  duration?: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  renderTime?: string;
  polyCount?: string;
}

export default function BlenderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; index: number } | null>(null)

  const goBack = () => {
    window.history.back()
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "Mechanical Keyboard Visualization",
      description: "A meticulously crafted 3D visualization exploring the intricate engineering of mechanical keyboards. This project demonstrates advanced material work, photorealistic lighting, and precision modeling techniques that bring every component to life.",
      category: "Product Visualization",
      year: "2024",
      images: [
        "/keyboard-1.png",
        "/keyboard-2.png"
      ],
      tags: ["3D Modeling", "Product Design", "Lighting", "Materials", "Photorealism"],
      software: ["Blender", "Cycles Render", "Substance Painter"],
      duration: "2 weeks",
      complexity: "Advanced",
      renderTime: "45 min/frame",
      polyCount: "2.3M"
    },
    {
      id: 2,
      title: "Abstract Motion Symphony",
      description: "An experimental journey through fluid dynamics, particle systems, and abstract geometries. This project pushes the boundaries of procedural animation and motion graphics, creating a visual symphony of mathematical beauty.",
      category: "Motion Graphics",
      year: "2024",
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ],
      tags: ["Animation", "Procedural", "Particle Systems", "Abstract", "Geometry Nodes"],
      software: ["Blender", "Geometry Nodes", "Compositor"],
      duration: "3 weeks",
      complexity: "Advanced",
      renderTime: "1.2 hr/frame",
      polyCount: "5.7M"
    },
    {
      id: 3,
      title: "Architectural Dreamscape",
      description: "A surreal architectural visualization that blends realistic building techniques with impossible geometries. This piece explores the intersection of practical architecture and imaginative design.",
      category: "Architecture",
      year: "2024",
      images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
      ],
      tags: ["Architecture", "Surreal", "Modeling", "Lighting", "Atmosphere"],
      software: ["Blender", "Cycles", "HDRI Haven"],
      duration: "1 week",
      complexity: "Intermediate",
      renderTime: "25 min/frame",
      polyCount: "1.8M"
    }
  ]

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null)
      }
      
      // Navigation for fullscreen images
      if (selectedImage) {
        const currentProject = projects.find(p => p.title === selectedImage.title);
        const currentImages = currentProject?.images || [];
        const totalImages = currentImages.length;
        
        if (totalImages > 1) {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const newIndex = selectedImage.index === 0 ? totalImages - 1 : selectedImage.index - 1;
            setSelectedImage({
              src: currentImages[newIndex],
              title: selectedImage.title,
              index: newIndex
            });
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const newIndex = selectedImage.index === totalImages - 1 ? 0 : selectedImage.index + 1;
            setSelectedImage({
              src: currentImages[newIndex],
              title: selectedImage.title,
              index: newIndex
            });
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedImage, projects])

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Dynamic Background with Floating Particles */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-orange-950/20 to-red-950/20" />
        {/* Animated geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: [0, Math.sin(i) * 50, 0],
              y: [0, Math.cos(i) * 30, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full border border-orange-400/20 rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Enhanced Header */}
      <motion.div 
        className="sticky top-0 z-50 backdrop-blur-xl border-b border-orange-500/20"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(67, 56, 202, 0.1))'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={goBack}
              className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 group"
              whileHover={{ x: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft 
                size={20} 
                className="group-hover:rotate-[-10deg] transition-transform duration-300" 
              />
              <span className="font-medium">Back to Portfolio</span>
            </motion.button>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Blender Gallery
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mx-auto mt-1" />
            </motion.div>
            
            {/* Filter Pills */}
            <div className="flex gap-2">
              {categories.map((category, i) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-gray-800/50 text-gray-400 hover:text-orange-400 hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section with Enhanced Visual Effects */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-6xl text-center relative">
          {/* Floating Blender Logo */}
          <motion.div
            className="absolute top-10 right-10 w-20 h-20 opacity-10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 rounded-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-16 relative"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-6 relative"
              style={{
                background: 'linear-gradient(135deg, #f97316, #ef4444, #ec4899, #f97316)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              3D Creations
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl blur-2xl -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Dive into my universe of 3D artistry where imagination meets technical mastery. 
              Each project represents a journey through digital craftsmanship, from concept to final render.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex justify-center gap-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { icon: Layers, label: 'Projects', value: filteredProjects.length },
                { icon: Zap, label: 'Software', value: '5+' },
                { icon: Sparkles, label: 'Experience', value: '2Y' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                    <stat.icon size={24} className="text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Projects Grid */}
      <section className="py-12 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8"
            >
              {filteredProjects.map((project, index) => (
                <EnhancedProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onImageClick={setSelectedImage}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (() => {
          const currentProject = projects.find(p => p.title === selectedImage.title);
          const currentImages = currentProject?.images || [];
          const totalImages = currentImages.length;
          
          const navigateImage = (direction: 'prev' | 'next') => {
            if (!currentProject) return;
            
            const currentIndex = selectedImage.index;
            let newIndex;
            
            if (direction === 'prev') {
              newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
            } else {
              newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
            }
            
            setSelectedImage({
              src: currentImages[newIndex],
              title: selectedImage.title,
              index: newIndex
            });
          };
          
          return (
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative w-[95vw] h-[95vh] flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 w-14 h-14 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500/90 transition-all duration-300 z-20 border border-gray-600"
                  onClick={() => setSelectedImage(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={28} />
                </motion.button>

                {/* Previous Image Button */}
                {totalImages > 1 && (
                  <motion.button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500/90 transition-all duration-300 z-20 border border-gray-600"
                    onClick={() => navigateImage('prev')}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ArrowLeft size={32} />
                  </motion.button>
                )}

                {/* Next Image Button */}
                {totalImages > 1 && (
                  <motion.button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500/90 transition-all duration-300 z-20 border border-gray-600"
                    onClick={() => navigateImage('next')}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ArrowLeft size={32} className="rotate-180" />
                  </motion.button>
                )}

                {/* Enhanced Image Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.img
                    key={selectedImage.src} // Add key to trigger animation on image change
                    src={selectedImage.src}
                    alt={`${selectedImage.title} - Full Size`}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'w-full h-full flex items-center justify-center text-white bg-gray-800 rounded-xl border-2 border-dashed border-gray-600';
                        placeholder.innerHTML = `
                          <div class="text-center p-8">
                            <div class="text-8xl mb-6">🎨</div>
                            <div class="text-orange-400 font-bold text-2xl mb-2">${selectedImage.title}</div>
                            <div class="text-gray-400 text-lg">Image ${selectedImage.index + 1}</div>
                            <div class="text-gray-500 text-sm mt-4">High-resolution preview coming soon</div>
                          </div>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>

                {/* Enhanced Image Info Panel */}
                <motion.div 
                  className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md rounded-2xl p-6 text-white border border-gray-700 max-w-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-bold text-xl mb-2 text-orange-400">{selectedImage.title}</h3>
                  <div className="flex items-center gap-4 text-gray-300">
                    <span className="text-sm">Image {selectedImage.index + 1} of {totalImages}</span>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <span className="text-sm">Click outside to close</span>
                    {totalImages > 1 && (
                      <>
                        <div className="w-px h-4 bg-gray-600"></div>
                        <span className="text-sm">Use ← → to navigate</span>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Keyboard hint */}
                <motion.div 
                  className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 text-white text-sm"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Press <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">ESC</kbd> to close
                  {totalImages > 1 && (
                    <span className="ml-2">
                      • <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">←</kbd>
                      <kbd className="px-2 py-1 bg-gray-700 rounded text-xs ml-1">→</kbd> to navigate
                    </span>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  )
}

// Enhanced Project Card Component with Modern Design
function EnhancedProjectCard({ 
  project, 
  index, 
  onImageClick
}: { 
  project: Project, 
  index: number,
  onImageClick: (image: { src: string; title: string; index: number }) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9])

  // Auto-rotate images
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [project.images.length, isHovered])

  const complexityColors = {
    'Beginner': 'from-green-400 to-emerald-500',
    'Intermediate': 'from-yellow-400 to-orange-500',
    'Advanced': 'from-red-400 to-pink-500'
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative mb-24 group"
      style={{ opacity, scale }}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-red-400/0 rounded-3xl blur-xl"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center relative">
        {/* Project Info */}
        <motion.div
          className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''} relative z-10`}
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
        >
          {/* Category & Complexity Badge */}
          <div className="flex items-center gap-4 mb-4">
            <motion.span 
              className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30"
              whileHover={{ scale: 1.05 }}
            >
              {project.category} • {project.year}
            </motion.span>
            <motion.div
              className={`px-3 py-1 bg-gradient-to-r ${complexityColors[project.complexity]} rounded-full text-white text-xs font-bold`}
              whileHover={{ scale: 1.05 }}
            >
              {project.complexity}
            </motion.div>
          </div>

          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-white relative"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {project.title}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h3>

          <motion.p 
            className="text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Technical Details */}
          <motion.div 
            className="grid grid-cols-2 gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-orange-400 text-2xl font-bold">{project.polyCount}</div>
              <div className="text-gray-400 text-sm">Polygons</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 text-2xl font-bold">{project.renderTime}</div>
              <div className="text-gray-400 text-sm">Render Time</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-2xl font-bold">{project.duration}</div>
              <div className="text-gray-400 text-sm">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-2xl font-bold">{project.software.length}</div>
              <div className="text-gray-400 text-sm">Tools Used</div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {project.tags.map((tag: string, tagIndex: number) => (
              <motion.span 
                key={tagIndex}
                className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 rounded-full text-sm border border-gray-600 hover:border-orange-400/50 transition-colors cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + tagIndex * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Software */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Code size={16} />
              <span>Software Stack:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.software.map((software: string, softwareIndex: number) => (
                <motion.span 
                  key={softwareIndex}
                  className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded text-sm border border-orange-500/30"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + softwareIndex * 0.1 }}
                >
                  {software}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Image Gallery */}
        <motion.div
          ref={imageRef}
          className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
          style={{ y }}
        >
          <div className="relative group/gallery">
            {/* Main Image Container */}
            <motion.div
              className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-3xl blur-xl opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-500" />
              
              {/* Image Stack */}
              <div className="relative w-full h-full">
                {project.images.map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: imgIndex === currentImageIndex ? 1 : 0,
                      scale: imgIndex === currentImageIndex ? 1 : 1.05,
                      zIndex: imgIndex === currentImageIndex ? 2 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <img 
                        src={image} 
                        alt={`${project.title} - View ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'w-full h-full flex items-center justify-center';
                            placeholder.innerHTML = `
                              <div class="text-center">
                                <div class="text-6xl mb-4">🎨</div>
                                <div class="text-orange-400 font-medium">${project.title}</div>
                                <div class="text-gray-400 text-sm">View ${imgIndex + 1}</div>
                              </div>
                            `;
                            parent.appendChild(placeholder);
                          }
                        }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Fullscreen Button */}
                      <motion.button
                        className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 hover:bg-orange-500/80 transition-all duration-300 z-20"
                        onClick={(e) => {
                          e.stopPropagation();
                          onImageClick({ 
                            src: image, 
                            title: project.title, 
                            index: imgIndex 
                          });
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="View Fullscreen"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                      </motion.button>
                      
                      {/* Click to Fullscreen Overlay */}
                      <div 
                        className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/20 flex items-center justify-center transition-all duration-300"
                        onClick={() => onImageClick({ 
                          src: image, 
                          title: project.title, 
                          index: imgIndex 
                        })}
                      >
                        <div className="text-white text-center">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-2">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                          </svg>
                          <span className="text-sm font-medium">Click to view fullscreen</span>
                        </div>
                      </div>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-sm opacity-75">
                          {imgIndex + 1} / {project.images.length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {project.images.map((_, imgIndex) => (
                  <button
                    key={imgIndex}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      imgIndex === currentImageIndex 
                        ? 'bg-orange-400 w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(imgIndex)}
                  />
                ))}
              </div>

              {/* Left Navigation Button */}
              {project.images.length > 1 && (
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-80 hover:opacity-100 transition-all duration-300 hover:bg-orange-500/80 hover:scale-110 z-10"
                  onClick={() => setCurrentImageIndex((prev) => prev === 0 ? project.images.length - 1 : prev - 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={20} />
                </motion.button>
              )}

              {/* Right Navigation Button */}
              {project.images.length > 1 && (
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-80 hover:opacity-100 transition-all duration-300 hover:bg-orange-500/80 hover:scale-110 z-10"
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % project.images.length)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={20} className="rotate-180" />
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
