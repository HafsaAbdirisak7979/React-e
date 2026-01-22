import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Recipe Book</h1>
      <p className="text-gray-600 mb-8">Discover delicious recipes from around the world.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link 
          to="/recipes"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Browse Recipes</h2>
          <p className="text-gray-600">View all our recipes</p>
        </Link>
        
        <Link 
          to="/categories"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Categories</h2>
          <p className="text-gray-600">Find recipes by category</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;