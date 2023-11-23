import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Footer from './components/Footer';

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <LayoutForNonNavbar>
          <Navbar />
          {/* <Footer/> */}
        </LayoutForNonNavbar>
       
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/Auth/signup" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

function LayoutForNonNavbar({ children }) {
  let [showNavbar, setShowNavbar] = useState(false);
  let location = useLocation();
  let excludedRoutes = [ "/Error","/Auth/signup"];

  useEffect(() => {
    if (excludedRoutes.includes(location.pathname)) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <div style={{position:"sticky",top:0,zIndex:99}} >
      {showNavbar && children}
    </div>
  );
}
