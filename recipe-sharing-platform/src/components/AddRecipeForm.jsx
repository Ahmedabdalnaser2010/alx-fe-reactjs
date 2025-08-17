import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddRecipeForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        image: '',
        ingredients: '',
        instructions: ''
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.title.trim()) newErrors.title = 'Title is required'
        if (!formData.summary.trim()) newErrors.summary = 'Summary is required'
        if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required'
        if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required'
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        // In a real app, you would save the data to a backend
        // For now, we'll just log it and navigate home
        console.log('New recipe:', {
            ...formData,
            ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
            id: Date.now() // Temporary ID
        })

        navigate('/')
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Recipe Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                        Summary
                    </label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows="2"
                        className={`w-full px-3 py-2 border rounded-md ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div>
                    <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                        Ingredients (one per line)
                    </label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        rows="4"
                        className={`w-full px-3 py-2 border rounded-md ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
                </div>

                <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                        Instructions
                    </label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        rows="6"
                        className={`w-full px-3 py-2 border rounded-md ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add Recipe
                    </button>
                </div>
            </form>
        </div>
    )
}