import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import { AppProvider } from './components/AppContext'; // Importiere den AppProvider

// Pages
import Home from './Pages/Home';
import Marktplatz from './Pages/Marktplatz';
import Inventar from './Pages/Inventar';
import Kompendium from "./Pages/Kompendium";

function App() {
  return (
    <>  
      <AppProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/markt" element={<Marktplatz />} />
            <Route path="/inventar" element={<Inventar />} />
            <Route path='/kompendium' element={<Kompendium />} />
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
