import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components
import Navbar from './components/Navbar'
import Login from './components/Login'

//Pages
import Home from './Pages/Home';
import Marktplatz from './Pages/Marktplatz'
import Inventar from './Pages/Inventar'


function App() {

  const [loggedInUser, setLoggedInUser] = useState()

  return (
    <>
    <h1>DnD Marktplatz</h1>
    
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/markt" element={<Marktplatz />} />
          <Route path="/inventar" element={<Inventar />} />
        </Routes>
    </Router>

    </>
  )
}

export default App