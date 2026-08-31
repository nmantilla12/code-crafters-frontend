import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
      >
        <span className="bottom-nav__icon">📊</span>
        <span className="bottom-nav__label">Inicio</span>
      </NavLink>

      <button 
        type="button" 
        className="bottom-nav__action-btn" 
        aria-label="Crear Nuevo Evento"
        onClick={() => navigate('/organizer/create-event')}
      >
        <span className="bottom-nav__plus">+</span>
      </button>

      <NavLink 
        to="/profile" 
        className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
      >
        <span className="bottom-nav__icon">👤</span>
        <span className="bottom-nav__label">Perfil</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;