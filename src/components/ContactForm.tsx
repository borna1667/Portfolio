import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Mail, User, MessageCircle, CheckCircle, AlertCircle, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useForm, ValidationError } from '@formspree/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import NetworkBackground from './NetworkBackground'
import Header from './Header'
import TurnstileWidget from './TurnstileWidget'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [showTurnstile, setShowTurnstile] = useState(false)
  
  // Replace with your actual Formspree form ID
  const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'mvgreroo'
  const [state, handleFormspreeSubmit] = useForm(FORMSPREE_FORM_ID)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.fromTo('.form-element', 
      { y: 50, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.3
      }
    )
  }, [])

  // Reset form after successful submission
  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTurnstileToken('')
      setShowTurnstile(false)
    }
  }, [state.succeeded])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token)
  }

  const handleTurnstileError = () => {
    setTurnstileToken('')
  }

  const handleTurnstileExpire = () => {
    setTurnstileToken('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Show Turnstile when user tries to submit for the first time
    if (!showTurnstile) {
      setShowTurnstile(true)
      // Give a moment for the turnstile to appear, then scroll to it
      setTimeout(() => {
        const turnstileElement = document.querySelector('[data-testid="cf-turnstile"]')
        if (turnstileElement) {
          turnstileElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    // Check if Turnstile is verified
    if (!turnstileToken) {
      // More user-friendly notification instead of alert
      return
    }
    
    // Create form data with Turnstile token for enhanced security
    const formDataWithToken = new FormData(e.currentTarget)
    formDataWithToken.append('cf-turnstile-response', turnstileToken)
    
    // Submit to Formspree with Turnstile token
    await handleFormspreeSubmit(e)
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message
  const canSubmit = isFormValid && (!showTurnstile || turnstileToken)

  const getStatusMessage = () => {
    if (state.submitting) return { type: 'loading', message: 'Sending your message...' }
    if (state.succeeded) return { type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' }
    if (state.errors) return { type: 'error', message: 'Failed to send message. Please try again.' }
    return { type: 'idle', message: '' }
  }

  const status = getStatusMessage()

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      <NetworkBackground />
      <Header />
      
      <div className="pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/')}
            className="form-element inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
            whileHover={{ x: -5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform" />
            Back to Portfolio
          </motion.button>

          {/* Header */}
          <motion.div
            className="form-element text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Work Together
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you. 
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="form-element bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-element">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                
                <div className="form-element">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              {/* Subject */}
              <div className="form-element">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                  placeholder="What's this about?"
                />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} />
              </div>

              {/* Message */}
              <div className="form-element">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              {/* Turnstile Widget - shown only after initial submit attempt */}
              {showTurnstile && (
                <motion.div
                  className="form-element"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <label className="text-sm font-medium text-gray-300">
                      Security Verification Required
                    </label>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                    <TurnstileWidget
                      onVerify={handleTurnstileVerify}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                      className="mb-2"
                    />
                    <div className="flex items-center gap-2 mt-3">
                      {turnstileToken ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <p className="text-sm text-green-400">
                            Security verification completed successfully
                          </p>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                          <p className="text-sm text-amber-400">
                            Please complete the security verification to send your message
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Status Message */}
              {status.type !== 'idle' && (
                <motion.div
                  className={`form-element flex items-center gap-2 p-4 rounded-lg ${
                    status.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                      : status.type === 'error'
                      ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                      : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {status.type === 'success' && <CheckCircle className="w-5 h-5" />}
                  {status.type === 'error' && <AlertCircle className="w-5 h-5" />}
                  {status.type === 'loading' && (
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!isFormValid || state.submitting}
                className="form-element w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:cursor-not-allowed"
                whileHover={{ scale: canSubmit && !state.submitting ? 1.02 : 1 }}
                whileTap={{ scale: canSubmit && !state.submitting ? 0.98 : 1 }}
              >
                {state.submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Secure Message...
                  </>
                ) : !showTurnstile ? (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                ) : !turnstileToken ? (
                  <>
                    <Shield className="w-5 h-5" />
                    Complete Security Check Above
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <CheckCircle className="w-4 h-4" />
                    Send Secure Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="form-element mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-400 mb-4">
              Prefer direct contact? Reach out to me at
            </p>
            <a 
              href="mailto:borna.bratranek@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium"
            >
              borna.bratranek@gmail.com
            </a>
            <div className="mt-6 flex justify-center items-center gap-2 text-green-400">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Usually responds within 24 hours</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
