import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initResourcePreloading } from './utils/resourcePreloader'

// Initialize resource preloading for better performance
initResourcePreloading()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
