// src/componentes/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkUserSession = () => {
      const rawOrganizer = localStorage.getItem('organizadorUser');
      const rawCrafters = localStorage.getItem('codeCraftersUser');
      const userRole = localStorage.getItem('userRole');

      let user = null;
      try {
        if (rawOrganizer) {
          user = JSON.parse(rawOrganizer);
        } else if (rawCrafters) {
          user = JSON.parse(rawCrafters);
        } else if (userRole) {
          user = { role: userRole, loggedIn: true };
        }
      } catch (error) {
        user = null;
      }
      setCurrentUser(user);
    };

    checkUserSession();
    window.addEventListener('storage', checkUserSession);
    return () => window.removeEventListener('storage', checkUserSession);
  }, [location.pathname]);

  const handleMenuToggle = () => {
    if (!currentUser || !currentUser.loggedIn) {
      navigate('/login');
      return;
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('organizadorUser');
    localStorage.removeItem('codeCraftersUser');
    localStorage.removeItem('userRole');
    setCurrentUser(null);
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-spacer"></div>

      <Link to="/" className="navbar-brand">
        CODE CRAFTERS
      </Link>

      <div className="navbar-user-section">
        <button
          type="button"
          onClick={handleMenuToggle}
          className="navbar-login-btn"
          aria-label="Menú de usuario"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="navbar-svg-icon"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        {isMenuOpen && currentUser && (
          <div className="navbar-dropdown">
            <span className="navbar-dropdown-email">
              {currentUser.email || 'Organizador'}
            </span>
            <Link 
              to="/organizer/dashboard" 
              onClick={() => setIsMenuOpen(false)}
              className="navbar-dropdown-item"
            >
              Panel de Control
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="navbar-dropdown-item navbar-dropdown-logout"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;