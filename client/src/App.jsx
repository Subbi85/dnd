import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import { AppProvider } from './components/AppContext';

// Pages
import Home from './Pages/Home';
import Marktplatz from './Pages/Marktplatz';
import Char from './Pages/Char';
import Kompendium from "./Pages/Kompendium";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
    <>  
      <AppProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/markt" element={<Marktplatz />} />
            <Route path="/char" element={<Char />} />
            <Route path='/kompendium' element={<Kompendium />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
