import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from "./components/RecipeList"
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>
              <Link to="/" className="app-title">
                🍳 Recipe Sharing App
              </Link>
            </h1>
            <nav className="main-nav">
              <Link to="/" className="nav-link">All Recipes</Link>
              <Link to="/add" className="nav-link">Add Recipe</Link>
              <Link to="/favorites" className="nav-link">My Favorites</Link>
              <Link to="/recommendations" className="nav-link">Recommendations</Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={
              <div className="home-page">
                <div className="search-section">
                  <SearchBar />
                </div>
                <div className="content-section">
                  <RecipeList />
                </div>
              </div>
            } />

            <Route path="/add" element={
              <div className="add-recipe-page">
                <AddRecipeForm />
              </div>
            } />

            <Route path="/recipe/:id" element={<RecipeDetails />} />

            <Route path="/favorites" element={
              <div className="favorites-page">
                <FavoritesList />
              </div>
            } />

            <Route path="/recommendations" element={
              <div className="recommendations-page">
                <RecommendationsList />
              </div>
            } />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2025 Recipe Sharing App. Built with React and Zustand.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;