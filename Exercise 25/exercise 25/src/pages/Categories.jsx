import React from 'react';
import { NavLink } from 'react-router-dom';

const CategorySidebar = ({ categories, activeCategory }) => {
  const getRecipeCount = (categoryId) => {
    const counts = {
      breakfast: 1,
      lunch: 1,
      dinner: 2,
      desserts: 1
    };
    return counts[categoryId] || 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
      
      <nav className="space-y-2">
        <NavLink
          to="/categories"
          className={({ isActive }) => 
            `flex justify-between items-center p-3 rounded hover:bg-gray-50 transition-colors ${
              isActive && !activeCategory 
                ? 'bg-rose-50 text-rose-700' 
                : 'text-gray-700'
            }`
          }
        >
          <span className="font-medium">All Categories</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
            5
          </span>
        </NavLink>

        {categories.map(category => (
          <NavLink
            key={category.id}
            to={`/categories/${category.id}`}
            className={({ isActive }) => 
              `flex justify-between items-center p-3 rounded hover:bg-gray-50 transition-colors ${
                isActive 
                  ? 'bg-rose-50 text-rose-700' 
                  : 'text-gray-700'
              }`
            }
          >
            <span className="font-medium">{category.name}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
              {getRecipeCount(category.id)}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CategorySidebar;