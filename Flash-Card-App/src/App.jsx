import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlainApp from "./plainApp"
import HeroSection from "./Components/HeroSection"
import Navigation from './Components/Navigation'

function App() {
  const [count, setCount] = useState(0)

 

  return (
    <>
    <h1 className="text-white">Landing Page</h1>
    <Navigation/>
    <HeroSection/>
    <Routes>
        <Route path="/plainApp" element={<PlainApp/>}/> 
      </Routes>
    </>
  )
}

export default App
