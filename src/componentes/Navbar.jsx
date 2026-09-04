import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('attendee'); // 'attendee' o 'organizer'

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleRoleSwitch = () => {
    setUserRole(prev => (prev === 'attendee' ? 'organizer' : 'attendee'));
  };

  return (
    <header className="navbar-container">
      {/* Logotipo / Marca principal */}
      <button 
        type="button" 
        onClick={() => handleNavClick('/')}
        className="navbar-brand"
      >
        Code Crafters <span className="navbar-brand__highlight">2026</span>
      </button>

      {/* Botón de Menú Hamburguesa para Móviles */}
      <button
        type="button"
        className="navbar-mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Abrir menú de navegación"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Navegación Principal (Escritorio y Móvil) */}
      <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          type="button" 
          onClick={() => handleNavClick('/')} 
          className="navbar-link"
        >
          Discovery
        </button>
        <button 
          type="button" 
          onClick={() => handleNavClick(userRole === 'organizer' ? '/dashboard' : '/events')} 
          className="navbar-link"
        >
          {userRole === 'organizer' ? 'Gestionar Eventos' : 'Mis Entradas (QR)'}
        </button>
        <button 
          type="button" 
          onClick={() => handleNavClick('/support')} 
          className="navbar-link"
        >
          Soporte
        </button>

        {/* Bloque de Acciones adaptado para mostrarse DENTRO del menú desplegable en móvil */}
        <div className="navbar-mobile-actions">
          <button
            type="button"
            onClick={() => {
              handleRoleSwitch();
              setMobileMenuOpen(false);
            }}
            className="navbar-role-btn"
          >
            Rol: {userRole === 'organizer' ? 'Organizador' : 'Asistente'}
          </button>

          <button 
            type="button" 
            onClick={() => handleNavClick('/register')} 
            className="navbar-register-btn"
          >
            Registro
          </button>

          <button 
            type="button"
            className="navbar-profile-mobile-btn"
            onClick={() => handleNavClick('/profile')}
          >
            <span className="navbar-avatar navbar-avatar--small">
              👤
            </span>
            <span className="navbar-profile-text">Mi Perfil ({userRole})</span>
          </button>
        </div>
      </nav>

      {/* Acciones de Usuario, Perfil y Selector de Flujos (Escritorio) */}
      <div className="navbar-actions">
        <button
          type="button"
          onClick={handleRoleSwitch}
          className="navbar-role-btn"
          title="Cambiar rol entre Asistente y Organizador"
        >
          Rol: {userRole === 'organizer' ? 'Organizador' : 'Asistente'}
        </button>

        <button 
          type="button" 
          onClick={() => handleNavClick('/register')} 
          className="navbar-register-btn"
        >
          Registro
        </button>

        <button 
          type="button"
          className="navbar-avatar"
          onClick={() => handleNavClick('/profile')}
          title={`Perfil activo (${userRole}): Ver cuenta`}
          aria-label="Ver perfil de usuario"
        >
          👤
        </button>
      </div>
    </header>
  );
};

export default Navbar;