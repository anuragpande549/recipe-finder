import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Over 10,000+ Recipes Added
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Cook smarter, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              eat better.
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
            Find the perfect recipe for any occasion. Filter by ingredients, save your favorites, and discover new flavors every day.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/app"
              className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-2 group"
            >
              Start Cooking Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth"
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Hero Visual / Floating Cards */}
        <div className="relative hidden lg:block h-[500px]">
          {/* Decorative Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-orange-200 to-amber-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>

          {/* Floating Card 1: Search */}
          <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 w-64 animate-bounce-slow">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <Search size={20} />
              </div>
              <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-full bg-slate-100 rounded-lg"></div>
              <div className="flex gap-2">
                <div className="h-2 w-1/3 bg-slate-200 rounded-full"></div>
                <div className="h-2 w-1/4 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Favorites */}
          <div className="absolute bottom-20 left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 w-64 animate-bounce-delayed">
            <img 
              src="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg" 
              alt="Food" 
              className="w-full h-32 object-cover rounded-xl mb-3"
            />
            <div className="flex justify-between items-center">
              <div>
                <div className="h-4 w-24 bg-slate-800 rounded mb-1"></div>
                <div className="h-3 w-16 bg-slate-400 rounded"></div>
              </div>
              <div className="bg-red-50 p-2 rounded-full text-red-500">
                <Heart fill="currentColor" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;