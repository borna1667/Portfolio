import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import BlenderShowcase from './components/BlenderShowcase'
import ContactForm from './components/ContactForm'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blender" element={<BlenderShowcase />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  )
}
