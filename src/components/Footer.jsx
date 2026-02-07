import React from "react";
import { Link } from "react-router-dom";
import { ChefHat, Facebook, Twitter, Instagram, Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-orange-600 p-2 rounded-lg text-white group-hover:bg-orange-500 transition-colors">
                <ChefHat size={24} />
              </div>
              <span className="text-xl font-bold text-slate-100 tracking-tight">
                Recipe<span className="text-orange-500">Hunter</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Discover, cook, and enjoy thousands of recipes from around the world. Your personal digital cookbook.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-100 font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/app" className="hover:text-orange-500 transition-colors">Find Recipes</Link></li>
              <li><a href="#features" className="hover:text-orange-500 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Popular Meals</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Randomizer</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-slate-100 font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter (Optional) */}
          <div>
            <h4 className="text-slate-100 font-bold mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">Get the latest recipes sent right to your inbox.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="bg-orange-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-orange-500 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} RecipeHunter. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>by Developers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;