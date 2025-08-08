import { useEffect } from "react";
import { auth } from "./firesbase/firebase";
import useAuthStore from "./Store/userStore";
import { Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Pages/Home";
import TechnologyPage from "./Pages/Technology"
import ServicePage from "./Pages/Service"
import ContactPage from "./Pages/Contact"
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import "./App.css";
import About from "./Pages/About";
import RateCalculator from "./Pages/Rates";


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/services" element={<ServicePage/>} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
