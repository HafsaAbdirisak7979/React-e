import React from 'react';
import { Link } from 'react-router-dom';

const recipes = [
  {
    id: 1,
    name: 'Classic Chocolate Cake',
    category: 'desserts',
    description: 'Rich and moist chocolate cake perfect for any occasion',
    time: '90 min',
    difficulty: 'Medium'
  },
  {
    id: 2,
    name: 'Spaghetti Carbonara',
    category: 'dinner',
    description: 'Traditional Italian pasta with creamy egg sauce',
    time: '30 min',
    difficulty: 'Easy'
  },
  {
    id: 3,
    name: 'Greek Salad',
    category: 'lunch',
    description: 'Fresh Mediterranean salad with feta cheese',
    time: '15 min',
    difficulty: 'Easy'
  },
  {
    id: 4,
    name: 'Breakfast Smoothie Bowl',
    category: 'breakfast',
    description: 'Healthy and colorful breakfast bowl',
    time: '10 min',
    difficulty: 'Easy'
  }
];

const RecipeList = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Recipes</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">{recipe.name}</h2>
                <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              
              <div className="flex justify-between text-sm text-gray-500 mb-6">
                <span>⏱️ {recipe.time}</span>
                <span>📊 {recipe.difficulty}</span>
              </div>
              
              <Link
                to={`/recipes/${recipe.id}`}
                className="block w-full bg-rose-600 text-white text-center py-3 rounded-lg hover:bg-rose-700 transition-colors"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;