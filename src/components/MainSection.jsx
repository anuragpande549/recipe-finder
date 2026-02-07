import React from "react";
import { Utensils, Globe, Shuffle, Clock } from "lucide-react";

const features = [
  {
    icon: <Utensils size={32} />,
    title: "Ingredient Search",
    desc: "Have leftovers? Enter your ingredients and find amazing recipes you can make right now.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <Globe size={32} />,
    title: "Global Cuisine",
    desc: "Explore flavors from around the world. Filter by Italian, Chinese, Mexican, and more.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Shuffle size={32} />,
    title: "Surprise Me",
    desc: "Can't decide what to eat? Let our randomizer pick a delicious meal for you.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <Clock size={32} />,
    title: "Save Time",
    desc: "Quick and easy recipes with clear instructions and video tutorials included.",
    color: "bg-green-100 text-green-600",
  },
];

const MainSection = () => {
  return (
    <section id="features" className="py-24 bg-slate-50/50 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything you need to <br />
            <span className="text-orange-600">master the kitchen</span>
          </h2>
          <p className="text-slate-600 text-lg">
            We've built the ultimate tool for home cooks. Simple, fast, and inspiring.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start cooking?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Join thousands of food lovers and start saving your favorite recipes today.
            </p>
            <a 
              href="/auth" 
              className="inline-block px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors"
            >
              Create Free Account
            </a>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

      </div>
    </section>
  );
};

export default MainSection;