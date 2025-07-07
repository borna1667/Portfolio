import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Github, Mail, MessageSquare, Palette } from 'lucide-react'

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const actions = [
    {
      icon: <ArrowUp size={20} />,
      label: 'Scroll to Top',
      onClick: scrollToTop,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      onClick: () => window.open('https://github.com/bornadev', '_blank'),
      color: 'from-gray-500 to-gray-600'
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      onClick: () => window.open('mailto:contact@borna.dev', '_blank'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <MessageSquare size={20} />,
      label: 'Discord',
      onClick: () => alert('Discord: @borna'),
      color: 'from-purple-500 to-purple-600'
    }
  ]



  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.onClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {action.icon}
                <span className="absolute right-14 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <ArrowUp size={24} /> : <Palette size={24} />}
        </motion.div>
      </motion.button>
    </div>
  )
}

export default FloatingActions
