// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogDetail from './components/BlogDetail';
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> 
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
    
  );
};

export default App;
