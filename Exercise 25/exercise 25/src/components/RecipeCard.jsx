const RecipeCard = ({ recipe }) => {
  const categoryColors = {
    breakfast: 'bg-green-100 text-green-800',
    lunch: 'bg-blue-100 text-blue-800',
    dinner: 'bg-purple-100 text-purple-800',
    desserts: 'bg-pink-100 text-pink-800',
  }

  const categoryColor = categoryColors[recipe.category] || 'bg-gray-100 text-gray-800'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${categoryColor}`}>
            {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">⏱️ {recipe.prepTime + recipe.cookTime} min</span>
            <span className="text-gray-500 text-sm">👤 {recipe.servings}</span>
          </div>
          <span className="text-rose-600 text-sm font-semibold hover:text-rose-700">
            View Recipe →
          </span>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard