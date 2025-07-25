import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PlainApp from "./plainApp";
import HeroSection from "./Components/HeroSection";
import Navigation from "./Components/Navigation";
import Features from "./Components/Features";
import About from "./Components/About";
import ContactPage from "./Pages/Contact";
import AboutPage from "./Pages/About";
import styles from "./Modules/HeroSection.module.css";
import self_development_books from "./data/self_development_books.json";
import septhen_king_books from "./data/stephen_king_books.json";
import Get_In_Touch from "./Components/Get_In_Touch";
function App() {
  const [count, setCount] = useState(0);
  const [featureCardData, setFeatureCardData] = useState({});
  



  useEffect(() => {
    setFeatureCardData([...self_development_books]);
    setFeatureCardData(prev => [...prev, ...septhen_king_books]);



    console.log(featureCardData);
  }, []);

  return (
    <>
      <div className={styles.maincontainer}>
        <Routes>
          <Route path="/Home" element={<App />} />
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/plainApp" element={<PlainApp />} />
        </Routes>
        <Navigation />
      </div>
      <div className={styles.imageContainer}>
         <HeroSection /> 
      </div>
      <div className={styles.featureContainer}>
        <Features props={featureCardData} />
      </div>
      <div>
        <About/>
      </div>
      <div>
        <Get_In_Touch/>
      </div>
    </>

  )
}

export default App
