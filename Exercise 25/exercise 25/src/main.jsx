import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound';
import { recipes, categories } from './data/recipes';
import './index.css';

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'recipes',
        element: <RecipeList recipes={recipes} categories={categories} />
      },
      {
        path: 'recipes/:id',
        element: <RecipeDetail recipes={recipes} />
      },
      {
        path: 'categories',
        element: <Categories recipes={recipes} categories={categories} />
      },
      {
        path: 'categories/:categoryId',
        element: <Categories recipes={recipes} categories={categories} />
      }
    ]
  }
]);

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);