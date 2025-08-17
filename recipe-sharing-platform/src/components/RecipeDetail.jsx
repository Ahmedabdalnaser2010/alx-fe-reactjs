import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import recipeData from '../data.json' // Import the JSON file directly

export default function RecipeDetail() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        // Use the imported data directly
        const foundRecipe = recipeData.find(r => r.id === parseInt(id))
        setRecipe(foundRecipe)
    }, [id])

    if (!recipe) return <div className="text-center py-8">Loading...</div>

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/" className="inline-block mb-4 text-blue-500 hover:text-blue-700">
                &larr; Back to Home
            </Link>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />

                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
                    <p className="text-gray-700 mb-6">{recipe.summary}</p>

                    <div className="grid md:grid-cols-2 gap-8">


                        <div>
                            <h2 className="text-xl font-semibold mb-3 border-b pb-2">Instructions</h2>
                            <div className="whitespace-pre-line">{recipe.instructions}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}