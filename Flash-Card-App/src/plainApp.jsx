import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';


function plainApp(){
const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/index.html")
      .then(res => res.text())
      .then(setHtml);
  }, []);

  console.log({html})

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}


export default plainApp;