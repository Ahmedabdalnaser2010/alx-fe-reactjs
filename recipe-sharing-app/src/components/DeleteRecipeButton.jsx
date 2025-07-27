import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId, onDeleteComplete, className = '' }) => {
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);

        try {
            // Add a small delay to show the loading state
            await new Promise(resolve => setTimeout(resolve, 500));

            deleteRecipe(recipeId);

            // Call the callback if provided
            if (onDeleteComplete) {
                onDeleteComplete();
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert('Failed to delete recipe. Please try again.');
        } finally {
            setIsDeleting(false);
            setShowConfirmation(false);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    if (showConfirmation) {
        return (
            <div className="delete-confirmation">
                <div className="confirmation-overlay">
                    <div className="confirmation-dialog">
                        <h3>Delete Recipe</h3>
                        <p>Are you sure you want to delete this recipe? This action cannot be undone.</p>
                        <div className="confirmation-actions">
                            <button
                                onClick={handleCancelDelete}
                                className="cancel-btn"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="delete-btn"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Recipe'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={handleDeleteClick}
            className={`delete-recipe-btn ${className}`}
            aria-label="Delete recipe"
            title="Delete this recipe"
        >
            🗑️ Delete Recipe
        </button>
    );
};

export default DeleteRecipeButton;