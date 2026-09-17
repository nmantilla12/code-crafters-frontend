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
        CODE CRAFTERS 2026
      </button>
    </header>
  );
};

export default Navbar;