import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import recipeData from "../data.json"
export default function HomePage() {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {

        setRecipes(recipeData)
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center mb-8">
                <Link
                    to="/add-recipe"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition-colors duration-300"
                >
                    Add New Recipe
                </Link>
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">Recipe Sharing Platform</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                            <p className="text-gray-600 mb-4">{recipe.summary}</p>
                            <Link
                                to={`/recipe/${recipe.id}`}
                                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                            >
                                View Recipe
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}