// routes.jsx
import React from 'react'; // ← KU DAR HALKAN
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
// ... other imports

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    // ...
  },
]);