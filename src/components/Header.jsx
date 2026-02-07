import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChefHat, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detect scroll to add a backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header on the actual app page if you want a different layout there
  if (location.pathname === "/app") return null; 

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-orange-500 p-2 rounded-lg text-white group-hover:bg-orange-600 transition-colors">
            <ChefHat size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            Recipe<span className="text-orange-500">Hunter</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">Features</a>
          <a href="#about" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">About</a>
          <Link 
            to="/auth" 
            className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-medium hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-200"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5">
          <a href="#features" className="text-lg font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <Link 
            to="/auth" 
            className="w-full text-center py-3 bg-orange-500 text-white rounded-xl font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign In / Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;