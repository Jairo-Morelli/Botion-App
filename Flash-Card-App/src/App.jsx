import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlainApp from "./plainApp"
import HeroSection from "./Components/HeroSection"
import Navigation from './Components/Navigation'
import Features from "./Components/Features"
import ContactPage from "./Pages/Contact"
import AboutPage from "./Pages/About"

function App() {
  const [count, setCount] = useState(0)

  useEffect(()=> {

  },[]);

  return (
    <>
    <Navigation/>
    <HeroSection/>
    <Routes>
        <Route path="/plainApp" element={<PlainApp/>}/>  
        <Route path="/Home" element={<App/>}/>
        <Route path="/About" element={<AboutPage/>}></Route>
        <Route path="/Contact" element={<ContactPage/>}/>
      </Routes>
    <Features/>
    </>
    
  )
}

export default App
