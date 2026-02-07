import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // Ensure this matches your file structure
import { 
  Search, 
  ChefHat, 
  Heart, 
  X, 
  Utensils, 
  ArrowRight,
  Shuffle,
  LogOut,
  MapPin,
  Clock
} from "lucide-react";

// --- Sub-Components ---

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-slate-200 h-48 w-full rounded-2xl mb-4"></div>
    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
  </div>
);

const RecipeModal = ({ recipe, onClose, toggleFavorite, isFavorite }) => {
  if (!recipe) return null;

  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push({
          item: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }
    return ingredients;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full md:hidden"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
            <h2 className="text-white text-3xl font-bold">{recipe.strMeal}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col bg-white">
          <div className="flex justify-between items-start mb-6">
            <h2 className="hidden md:block text-3xl font-bold text-slate-800">{recipe.strMeal}</h2>
            <div className="flex gap-2">
               <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe); }}
                className={`p-2 rounded-full border transition-colors ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'border-slate-200 text-slate-400 hover:text-red-500'}`}
              >
                <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button onClick={onClose} className="hidden md:block p-2 hover:bg-slate-100 rounded-full text-slate-500">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium flex items-center gap-1">
              <Utensils size={14} /> {recipe.strCategory}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
              <MapPin size={14} /> {recipe.strArea}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Ingredients</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin">
                {getIngredients().map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 text-sm p-2 bg-slate-50 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                    <span className="font-semibold">{ing.measure}</span> {ing.item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Instructions</h3>
              <div className="text-slate-600 text-sm leading-relaxed max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                {recipe.strInstructions.split('\r\n').map((step, idx) => (
                  step.trim() && <p key={idx} className="mb-3">{step}</p>
                ))}
              </div>
            </div>

            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                Watch Tutorial
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const RecipeApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("home"); // 'home' or 'favorites'
  
  // Favorites State (Persisted in LocalStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("recipeFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  // Initial Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const catData = await catRes.json();
        setCategories([{ strCategory: "All" }, ...catData.categories]);
        fetchRecipes(""); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Save favorites when changed
  useEffect(() => {
    localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchRecipes = async (query = "") => {
    setLoading(true);
    setView("home");
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      if (selectedCategory !== "All" && !query) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomRecipe = async () => {
    setLoading(true);
    setView("home");
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      setSelectedRecipe(data.meals[0]); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setSelectedRecipe(data.meals[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = (recipe) => {
    const isFav = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to landing page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Re-fetch when category changes
  useEffect(() => {
    if (selectedCategory !== "All") {
      setSearchTerm("");
      fetchRecipes("");
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Dashboard Header */}
      <nav className="bg-white sticky top-0 z-30 border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setView("home"); fetchRecipes("");}}>
            <div className="bg-orange-500 p-2 rounded-lg">
              <ChefHat className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
              Recipe<span className="text-orange-500">Hunter</span>
            </h1>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchRecipes(searchTerm)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
             <button
              onClick={fetchRandomRecipe}
              className="p-2.5 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors"
              title="Surprise Me"
            >
              <Shuffle size={20} />
            </button>
            
            <button
              onClick={() => setView("favorites")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${view === 'favorites' ? 'bg-red-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Heart size={18} fill={view === 'favorites' ? "currentColor" : "none"} />
              <span className="hidden sm:inline">Saved</span>
              <span className="bg-red-100 text-red-600 text-xs py-0.5 px-2 rounded-full ml-1">
                {favorites.length}
              </span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-medium text-sm px-2"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Category Pills */}
{view === "home" && (
  <div className="mb-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
    {categories
      .filter(cat => cat.strCategory !== "Beef")
      .map(cat => (
        <button
          key={cat.strCategory}
          onClick={() => setSelectedCategory(cat.strCategory)}
          className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all ${
            selectedCategory === cat.strCategory
              ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
          }`}
        >
          {cat.strCategory}
        </button>
      ))}
  </div>
)}


        <div className="mb-6 flex items-baseline justify-between">
           <h2 className="text-2xl font-bold text-slate-800">
             {view === "favorites" ? "Your Cookbook" : searchTerm ? `Results for "${searchTerm}"` : `${selectedCategory} Recipes`}
           </h2>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <LoadingSkeleton key={i} />)
          ) : (view === "favorites" ? favorites : recipes).length > 0 ? (
            (view === "favorites" ? favorites : recipes).map((recipe) => (
              <div
                key={recipe.idMeal}
                onClick={() => fetchRecipeDetails(recipe.idMeal)}
                className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Quick Favorite Button on Card */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe); }}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:scale-110"
                  >
                    <Heart size={18} fill={favorites.some(f => f.idMeal === recipe.idMeal) ? "currentColor" : "none"} />
                  </button>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-1 mb-1">
                    {recipe.strMeal}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                       {recipe.strArea || "Global"}
                    </span>
                    <span className="text-orange-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="text-orange-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No recipes found</h3>
              <p className="text-slate-500">Try adjusting your search or filters.</p>
              {view === "favorites" && (
                <button 
                  onClick={() => setView("home")}
                  className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                  Browse Recipes
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.some(f => f.idMeal === selectedRecipe.idMeal)}
        />
      )}
    </div>
  );
};

export default RecipeApp;