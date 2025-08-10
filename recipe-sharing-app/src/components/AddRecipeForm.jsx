import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
    const addRecipe = useRecipeStore(state => state.addRecipe);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: '',
        prepTime: ''
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

        const newRecipe = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            ingredients: ingredientsArray,
            prepTime: parseInt(formData.prepTime)
        };

        addRecipe(newRecipe);

        // Reset form
        setFormData({
            title: '',
            description: '',
            ingredients: '',
            prepTime: ''
        });

        // Show success message (optional)
        alert('Recipe added successfully!');
    };

    return (
        <div className="add-recipe-form">
            <h2>Add New Recipe</h2>
            <form onSubmit={handleSubmit} className="recipe-form">
                <div className="form-group">
                    <label htmlFor="title">Recipe Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter recipe title"
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
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
                    <label htmlFor="ingredients">Ingredients (comma-separated):</label>
                    <textarea
                        id="ingredients"
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
                    <label htmlFor="prepTime">Preparation Time (minutes):</label>
                    <input
                        type="number"
                        id="prepTime"
                        name="prepTime"
                        value={formData.prepTime}
                        onChange={handleInputChange}
                        placeholder="30"
                        min="1"
                        className={errors.prepTime ? 'error' : ''}
                    />
                    {errors.prepTime && <span className="error-message">{errors.prepTime}</span>}
                </div>

                <button type="submit" className="submit-btn">
                    Add Recipe
                </button>
            </form>
        </div>
    );
};

export default AddRecipeForm;