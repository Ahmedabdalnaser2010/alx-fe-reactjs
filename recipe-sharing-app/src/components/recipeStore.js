import { create } from 'zustand';

const useRecipeStore = create((set) => ({
    // Recipe state
    recipes: [
        {
            id: 1,
            title: "Spaghetti Carbonara",
            description: "A classic Italian pasta dish with eggs, cheese, and pancetta.",
            ingredients: ["spaghetti", "eggs", "parmesan cheese", "pancetta", "black pepper"],
            prepTime: 30
        },
        {
            id: 2,
            title: "Chicken Stir Fry",
            description: "Quick and healthy stir fry with chicken and vegetables.",
            ingredients: ["chicken breast", "bell peppers", "broccoli", "soy sauce", "garlic"],
            prepTime: 20
        }
    ],

    // Search and filtering state
    searchTerm: '',
    filteredRecipes: [],

    // Favorites state
    favorites: [],
    recommendations: [],

    // Recipe actions
    addRecipe: (newRecipe) => set((state) => ({
        recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
    })),

    updateRecipe: (updatedRecipe) => set((state) => ({
        recipes: state.recipes.map(recipe =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        )
    })),

    deleteRecipe: (recipeId) => set((state) => ({
        recipes: state.recipes.filter(recipe => recipe.id !== recipeId),
        favorites: state.favorites.filter(id => id !== recipeId)
    })),

    setRecipes: (recipes) => set({ recipes }),

    // Search actions
    setSearchTerm: (term) => set((state) => {
        if (state.searchTerm === term) {
            return state; // Return current state if term hasn't changed
        }
        const filteredRecipes = state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(term.toLowerCase()) ||
            recipe.description.toLowerCase().includes(term.toLowerCase()) ||
            recipe.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(term.toLowerCase())
            )
        );
        return { searchTerm: term, filteredRecipes };
    }),

    filterRecipes: () => set((state) => ({
        filteredRecipes: state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            recipe.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
        )
    })),

    // Favorites actions
    addFavorite: (recipeId) => set((state) => {
        if (!state.favorites.includes(recipeId)) {
            return { favorites: [...state.favorites, recipeId] };
        }
        return state;
    }),

    removeFavorite: (recipeId) => set((state) => ({
        favorites: state.favorites.filter(id => id !== recipeId)
    })),

    // Recommendations action
    generateRecommendations: () => set((state) => {
        // Simple recommendation algorithm based on favorites
        const favoriteRecipes = state.recipes.filter(recipe =>
            state.favorites.includes(recipe.id)
        );

        if (favoriteRecipes.length === 0) {
            // If no favorites, recommend random recipes
            const shuffled = [...state.recipes].sort(() => 0.5 - Math.random());
            const newRecommendations = shuffled.slice(0, 3);

            // Only update if recommendations actually changed
            if (JSON.stringify(newRecommendations) !== JSON.stringify(state.recommendations)) {
                return { recommendations: newRecommendations };
            }
            return state;
        }

        // Find recipes with similar ingredients to favorites
        const favoriteIngredients = favoriteRecipes.flatMap(recipe => recipe.ingredients);
        const recommended = state.recipes
            .filter(recipe => !state.favorites.includes(recipe.id))
            .map(recipe => {
                const commonIngredients = recipe.ingredients.filter(ingredient =>
                    favoriteIngredients.includes(ingredient)
                );
                return { ...recipe, score: commonIngredients.length };
            })
            .filter(recipe => recipe.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        // Only update if recommendations actually changed
        if (JSON.stringify(recommended) !== JSON.stringify(state.recommendations)) {
            return { recommendations: recommended };
        }
        return state;
    })
}));

export default useRecipeStore;