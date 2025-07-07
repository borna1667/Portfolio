import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import BlenderShowcase from './components/BlenderShowcase'
import AnimatedCursor from './components/AnimatedCursor'

export default function App() {
  return (
    <Router>
      <AnimatedCursor />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blender" element={<BlenderShowcase />} />
      </Routes>
    </Router>
  )
}
