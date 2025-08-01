import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
/*CSS*/
import styles from "./Modules/HeroSection.module.css";
import "./App.css";
/*The original capstone, this needs a better name */
import PlainApp from "./plainApp";
/*APIs*/
import self_development_books from "./data/self_development_books.json";
import septhen_king_books from "./data/stephen_king_books.json";
/*Components */
import Get_In_Touch from "./Components/Get_In_Touch";
import Features from "./Components/Features";
import HeroSection from "./Components/HeroSection";
import Navigation from "./Components/Navigation";
import Book_Catalogue from "./Components/Book_Catalogue";
import About from "./Components/About";
import ContactPage from "./Pages/Contact";
import Clients from "./Components/Clients";
import Team from "./Components/Team";


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
          <Route path="/About" element={<About />}></Route>
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/plainApp" element={<PlainApp />} />
        </Routes>
        <Navigation />
      </div>
      <div className={styles.imageContainer}>
         <HeroSection /> 
      </div>
      <div className={styles.featureContainer}>
        <Book_Catalogue props={featureCardData} />
      </div>
      <div>
         <Features/> 
      </div>
      <div>
        <About/>
      </div>
      <div>
        <Clients/>
      </div>
      <div>
        <Team/>
      </div>
      <div>
        <Get_In_Touch/>
      </div>
      <footer>
        <h1 className="text-9xl text-white"> THIS IS THE FOOTER</h1>
      </footer>
    </>

  )
}

export default App
