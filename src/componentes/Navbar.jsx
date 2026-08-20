// src/componentes/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <button 
        type="button" 
        onClick={() => navigate('/')}
        className="navbar__brand"
      >
        Code Crafters 2026
      </button>

      <nav className="navbar__nav">
        <button type="button" onClick={() => navigate('/')} className="navbar__link">Discovery</button>
        <button type="button" onClick={() => navigate('/events')} className="navbar__link">My Tickets</button>
        <button type="button" onClick={() => navigate('/')} className="navbar__link">Support</button>
      </nav>

      <div className="navbar__actions">
        <button 
          type="button" 
          onClick={() => navigate('/register')} 
          className="navbar__btn-register"
        >
          Register
        </button>
        <div className="navbar__avatar">
          👤
        </div>
      </div>
    </header>
  );
};

export default Navbar;