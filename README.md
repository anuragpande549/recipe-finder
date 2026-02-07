# 🍳 RecipeHunter

RecipeHunter is a modern, responsive **single-page application (SPA)** that solves the everyday dilemma:  
**“What should I cook today?”**

Built with **React + Vite**, the app allows users to search thousands of recipes, filter by cuisine or category, and save their favorites — all wrapped in a premium, interactive UI.

---

## ✨ Features

- 🔍 **Smart Search**  
  Search recipes by name or ingredient instantly.

- 🔐 **Secure Authentication**  
  Login and signup powered by Firebase Authentication.

- ❤️ **Favorites System**  
  Save your favorite meals to a personal list (locally persisted).

- 🎲 **Surprise Me**  
  Get a random recipe suggestion when you’re feeling indecisive.

- 🌍 **Global Filtering**  
  Browse recipes by:
  - Category (Vegan, Seafood, Dessert, etc.)
  - Area / Cuisine (Italian, Japanese, Indian, etc.)

- 📱 **Fully Responsive**  
  Optimized for desktop, tablet, and mobile devices.

- ⚡ **Modern UI & UX**
  - Glassmorphism design
  - Mouse spotlight interaction
  - Skeleton loading states
  - Modal recipe details
  - Smooth animations

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Vite  
- **Styling:** Tailwind CSS  
- **Routing:** React Router DOM (v6)  
- **Authentication:** Firebase Authentication  
- **API:** TheMealDB (Open Recipe API)  
- **Icons:** Lucide React  

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

---

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/recipe-hunter.git
cd recipe-hunter


2. Install dependencies

npm install


Environment Variables

Create a .env file in the root directory and add your Firebase configuration:

VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

You can find these values in
Firebase Console → Project Settings → General → Your Apps

Run the Development Server
npm run dev


📂 Project Structure
src/
├── components/        # Reusable UI components
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── MainSection.jsx
│   └── Footer.jsx
├── pages/
│   └── AuthPage.jsx   # Login / Signup logic
├── RecipeApp.jsx      # Main dashboard logic
├── App.jsx            # Routing and layout
├── firebase.js        # Firebase configuration
└── main.jsx           # Entry point

