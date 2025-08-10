import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
    const { favorites, recipes, removeFavorite } = useRecipeStore(state => ({
        favorites: state.favorites,
        recipes: state.recipes,
        removeFavorite: state.removeFavorite
    }));

    const favoriteRecipes = favorites
        .map(id => recipes.find(recipe => recipe.id === id))
        .filter(recipe => recipe !== undefined); // Filter out any undefined recipes

    const handleRemoveFavorite = (recipeId) => {
        removeFavorite(recipeId);
    };

    if (favoriteRecipes.length === 0) {
        return (
            <div className="favorites-list">
                <h2>My Favorites</h2>
                <div className="empty-favorites">
                    <p>You haven't added any favorite recipes yet.</p>
                    <p>Start exploring recipes and click the heart icon to add them to your favorites!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-list">
            <h2>My Favorites ({favoriteRecipes.length})</h2>
            <div className="favorites-grid">
                {favoriteRecipes.map(recipe => (
                    <div key={recipe.id} className="favorite-card">
                        <div className="favorite-card-header">
                            <h3>
                                <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                                    {recipe.title}
                                </Link>
                            </h3>
                            <button
                                onClick={() => handleRemoveFavorite(recipe.id)}
                                className="remove-favorite-btn"
                                aria-label="Remove from favorites"
                                title="Remove from favorites"
                            >
                                ❤️
                            </button>
                        </div>

                        <p className="favorite-description">{recipe.description}</p>

                        <div className="favorite-meta">
                            <span className="prep-time">⏱️ {recipe.prepTime} min</span>
                            <span className="ingredients-count">
                                🥘 {recipe.ingredients?.length || 0} ingredients
                            </span>
                        </div>

                        <div className="favorite-ingredients">
                            <strong>Key Ingredients:</strong>
                            <div className="ingredients-preview">
                                {recipe.ingredients?.slice(0, 3).map((ingredient, index) => (
                                    <span key={index} className="ingredient-tag">
                                        {ingredient}
                                    </span>
                                ))}
                                {recipe.ingredients?.length > 3 && (
                                    <span className="ingredient-tag more">
                                        +{recipe.ingredients.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="favorite-actions">
                            <Link to={`/recipe/${recipe.id}`} className="view-recipe-btn">
                                View Recipe
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;