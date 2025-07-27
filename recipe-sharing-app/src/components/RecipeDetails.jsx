import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipeId = parseInt(id);

    const [isEditing, setIsEditing] = useState(false);

    const { recipe, favorites, addFavorite, removeFavorite } = useRecipeStore(state => ({
        recipe: state.recipes.find(recipe => recipe.id === recipeId),
        favorites: state.favorites,
        addFavorite: state.addFavorite,
        removeFavorite: state.removeFavorite
    }));

    if (!recipe) {
        return (
            <div className="recipe-details">
                <h2>Recipe Not Found</h2>
                <p>The recipe you're looking for doesn't exist.</p>
                <button onClick={() => navigate('/')} className="back-btn">
                    Back to Recipes
                </button>
            </div>
        );
    }

    const isFavorite = favorites.includes(recipeId);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(recipeId);
        } else {
            addFavorite(recipeId);
        }
    };

    const handleEditComplete = () => {
        setIsEditing(false);
    };

    const handleDeleteComplete = () => {
        navigate('/');
    };

    if (isEditing) {
        return (
            <EditRecipeForm
                recipe={recipe}
                onEditComplete={handleEditComplete}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div className="recipe-details">
            <div className="recipe-header">
                <button onClick={() => navigate('/')} className="back-btn">
                    ← Back to Recipes
                </button>
                <div className="recipe-actions">
                    <button
                        onClick={toggleFavorite}
                        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                    </button>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="edit-btn"
                    >
                        ✏️ Edit Recipe
                    </button>
                    <DeleteRecipeButton
                        recipeId={recipeId}
                        onDeleteComplete={handleDeleteComplete}
                    />
                </div>
            </div>

            <div className="recipe-content">
                <header className="recipe-title-section">
                    <h1>{recipe.title}</h1>
                    <div className="recipe-meta">
                        <span className="prep-time">⏱️ {recipe.prepTime} minutes</span>
                        <span className="ingredients-count">
                            🥘 {recipe.ingredients?.length || 0} ingredients
                        </span>
                    </div>
                </header>

                <section className="recipe-description">
                    <h2>Description</h2>
                    <p>{recipe.description}</p>
                </section>

                <section className="recipe-ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.ingredients?.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default RecipeDetails;