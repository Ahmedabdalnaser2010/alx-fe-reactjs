import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, onEditComplete, onCancel }) => {
    const updateRecipe = useRecipeStore(state => state.updateRecipe);

    const [formData, setFormData] = useState({
        title: recipe.title || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients?.join(', ') || '',
        prepTime: recipe.prepTime || ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Recipe title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Recipe description is required';
        }

        if (!formData.ingredients.trim()) {
            newErrors.ingredients = 'Ingredients are required';
        }

        if (!formData.prepTime || formData.prepTime <= 0) {
            newErrors.prepTime = 'Preparation time must be a positive number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Process ingredients string into array
        const ingredientsArray = formData.ingredients
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient.length > 0);

        const updatedRecipe = {
            ...recipe,
            title: formData.title.trim(),
            description: formData.description.trim(),
            ingredients: ingredientsArray,
            prepTime: parseInt(formData.prepTime)
        };

        updateRecipe(updatedRecipe);
        onEditComplete();
    };

    return (
        <div className="edit-recipe-form">
            <div className="form-header">
                <h2>Edit Recipe</h2>
                <button onClick={onCancel} className="cancel-btn">
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="recipe-form">
                <div className="form-group">
                    <label htmlFor="edit-title">Recipe Title:</label>
                    <input
                        type="text"
                        id="edit-title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter recipe title"
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="edit-description">Description:</label>
                    <textarea
                        id="edit-description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your recipe"
                        rows="4"
                        className={errors.description ? 'error' : ''}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="edit-ingredients">Ingredients (comma-separated):</label>
                    <textarea
                        id="edit-ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleInputChange}
                        placeholder="e.g., flour, eggs, milk, sugar"
                        rows="3"
                        className={errors.ingredients ? 'error' : ''}
                    />
                    {errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="edit-prepTime">Preparation Time (minutes):</label>
                    <input
                        type="number"
                        id="edit-prepTime"
                        name="prepTime"
                        value={formData.prepTime}
                        onChange={handleInputChange}
                        placeholder="30"
                        min="1"
                        className={errors.prepTime ? 'error' : ''}
                    />
                    {errors.prepTime && <span className="error-message">{errors.prepTime}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        Update Recipe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditRecipeForm;