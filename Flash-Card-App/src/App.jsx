import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlainApp from "./plainApp"
import HeroSection from "./Components/HeroSection"
import Navigation from './Components/Navigation'
import Features from "./Components/Features"
import ContactPage from "./Pages/Contact"
import AboutPage from "./Pages/About"
import styles from "./Modules/HeroSection.module.css"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {

  }, []);

  return (
    <>
      <div className={styles.maincontainer}>
        <Routes>
          <Route path="/plainApp" element={<PlainApp />} />
          <Route path="/Home" element={<App />} />
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>
        <Navigation />
        <div className={styles.background}>
        <HeroSection />
        </div>
        <div className='w-[100%] '>
        <Features />
        </div>
      </div>
    </>

  )
}

export default App
