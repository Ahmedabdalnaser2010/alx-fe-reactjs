import React from 'react';
import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const { recipes, searchTerm, filteredRecipes, favorites, addFavorite, removeFavorite } = useRecipeStore(state => ({
        recipes: state.recipes,
        searchTerm: state.searchTerm,
        filteredRecipes: state.filteredRecipes,
        favorites: state.favorites,
        addFavorite: state.addFavorite,
        removeFavorite: state.removeFavorite
    }));

    // Display filtered recipes if there's a search term, otherwise show all recipes
    const displayedRecipes = searchTerm ? filteredRecipes : recipes;

    const toggleFavorite = (recipeId) => {
        if (favorites.includes(recipeId)) {
            removeFavorite(recipeId);
        } else {
            addFavorite(recipeId);
        }
    };

    return (
        <div className="recipe-list">
            <h2>Recipe Collection</h2>
            {displayedRecipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                <div className="recipes-grid">
                    {displayedRecipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <div className="recipe-header">
                                <h3>
                                    <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                                        {recipe.title}
                                    </Link>
                                </h3>
                                <button
                                    onClick={() => toggleFavorite(recipe.id)}
                                    className={`favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                                    aria-label={favorites.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    {favorites.includes(recipe.id) ? '❤️' : '🤍'}
                                </button>
                            </div>
                            <p className="recipe-description">{recipe.description}</p>
                            <div className="recipe-meta">
                                <span className="prep-time">⏱️ {recipe.prepTime} min</span>
                                <span className="ingredients-count">
                                    🥘 {recipe.ingredients?.length || 0} ingredients
                                </span>
                            </div>
                            <div className="recipe-ingredients">
                                <strong>Ingredients:</strong>
                                <ul>
                                    {recipe.ingredients?.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;