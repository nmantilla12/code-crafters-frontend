import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar-container">
      {/* Logotipo / Marca principal centrada */}
      <button 
        type="button" 
        onClick={() => navigate('/')}
        className="navbar-brand"
      >
        Code Crafters <span className="navbar-brand__highlight">2026</span>
      </button>
    </header>
  );
};

export default Navbar;