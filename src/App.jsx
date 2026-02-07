import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Your firebase config file

// --- Import the Components we created ---
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";   // The Login/Signup Page
import RecipeApp from "./RecipeApp";       // The Main Dashboard

// --- 1. Mouse Spotlight Effect ---
const MouseSpotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(249, 115, 22, 0.06), transparent 40%)`,
      }}
    />
  );
};

// --- 2. Layout for the Landing Page ---
// This groups Header, Hero, Main, and Footer together for the home page ("/")
const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <MainSection />
      </main>
      <Footer />
    </div>
  );
};

// --- 3. Protected Route Component ---
// Checks if user is logged in. If not, redirects to /auth.
const RequireAuth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// --- 4. Main App Component ---
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-600">
        
        {/* The cool background effect */}
        <MouseSpotlight />

        <Routes>
          {/* Route 1: The Landing Page */}
          <Route path="/" element={<LandingLayout />} />

          {/* Route 2: Login / Signup */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Route 3: The Recipe Dashboard (Protected) */}
          <Route 
            path="/app" 
            element={
              <RequireAuth>
                <RecipeApp />
              </RequireAuth>
            } 
          />
          
          {/* Fallback: Redirect unknown URLs to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App