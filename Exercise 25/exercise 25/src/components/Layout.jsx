import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">🍳 RecipeBook</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/recipes">All Recipes</Link>
            <Link to="/categories">Categories</Link>
          </div>
        </nav>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>© 2024 RecipeBook - Delicious Recipes for Everyone</p>
      </footer>
    </div>
  );
};

export default Layout;