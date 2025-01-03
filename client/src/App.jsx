import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components
import Navbar from './components/Navbar'

//Pages
import Home from './Pages/Home';
import Marktplatz from './Pages/Marktplatz'
import Inventar from './Pages/Inventar'
import Monsters from "./Pages/Monsters"

function App() {

  const [loggedInUser, setLoggedInUser] = useState()

  return (
    <>
    
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/markt" element={<Marktplatz />} />
          <Route path="/inventar" element={<Inventar />} />
          <Route path='/monsters' element={<Monsters/>} />
        </Routes>
    </Router>

    </>
  )
}

export default App