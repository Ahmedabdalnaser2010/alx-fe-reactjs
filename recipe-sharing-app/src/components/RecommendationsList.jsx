import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const { recommendations, favorites, generateRecommendations, addFavorite, removeFavorite } = useRecipeStore(state => ({
    recommendations: state.recommendations,
    favorites: state.favorites,
    generateRecommendations: state.generateRecommendations,
    addFavorite: state.addFavorite,
    removeFavorite: state.removeFavorite
  }));

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <h2>Recommended for You</h2>
        <div className="empty-recommendations">
          <p>No recommendations available at the moment.</p>
          <p>Add some recipes to your favorites to get personalized recommendations!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-list">
      <div className="recommendations-header">
        <h2>Recommended for You</h2>
        <p className="recommendations-subtitle">
          Based on your favorite recipes, we think you'll love these:
        </p>
      </div>

      <div className="recommendations-grid">
        {recommendations.map(recipe => (
          <div key={recipe.id} className="recommendation-card">
            <div className="recommendation-badge">
              ⭐ Recommended
            </div>

            <div className="recommendation-header">
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

            <p className="recommendation-description">{recipe.description}</p>

            <div className="recommendation-meta">
              <span className="prep-time">⏱️ {recipe.prepTime} min</span>
              <span className="ingredients-count">
                🥘 {recipe.ingredients?.length || 0} ingredients
              </span>
              {recipe.score && (
                <span className="match-score">
                  🎯 {recipe.score} matching ingredient{recipe.score !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="recommendation-ingredients">
              <strong>Ingredients:</strong>
              <div className="ingredients-preview">
                {recipe.ingredients?.slice(0, 4).map((ingredient, index) => (
                  <span key={index} className="ingredient-tag">
                    {ingredient}
                  </span>
                ))}
                {recipe.ingredients?.length > 4 && (
                  <span className="ingredient-tag more">
                    +{recipe.ingredients.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div className="recommendation-actions">
              <Link to={`/recipe/${recipe.id}`} className="view-recipe-btn">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="recommendations-footer">
        <button
          onClick={generateRecommendations}
          className="refresh-recommendations-btn"
        >
          🔄 Refresh Recommendations
        </button>
      </div>
    </div>
  );
};

export default RecommendationsList;