import { Turnstile } from '@marsidev/react-turnstile'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface TurnstileWidgetProps {
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  className?: string
}

export default function TurnstileWidget({ 
  onVerify, 
  onError, 
  onExpire, 
  className = '' 
}: TurnstileWidgetProps) {
  const [isLoading, setIsLoading] = useState(true)
  const siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY

  if (!siteKey) {
    console.warn('Cloudflare Turnstile site key not found in environment variables')
    return (
      <div className="text-center py-4">
        <p className="text-amber-400 text-sm">
          Security verification is currently unavailable. Please contact support.
        </p>
      </div>
    )
  }

  const handleSuccess = (token: string) => {
    setIsLoading(false)
    onVerify(token)
  }

  const handleError = () => {
    setIsLoading(false)
    onError?.()
  }

  const handleExpire = () => {
    setIsLoading(false)
    onExpire?.()
  }

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && (
        <div className="flex items-center gap-2 mb-2 text-blue-400">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading security verification...</span>
        </div>
      )}
      <Turnstile
        siteKey={siteKey}
        onSuccess={handleSuccess}
        onError={handleError}
        onExpire={handleExpire}
      />
    </motion.div>
  )
}
