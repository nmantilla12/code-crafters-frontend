import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <>
      <style>{`
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #0f172a;
          border-bottom: 2px solid #334155;
          color: #ffffff;
          font-family: system-ui, -apple-system, sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-sizing: border-box;
          width: 100%;
        }

        .navbar-brand {
          background: transparent;
          border: none;
          color: #f8fafc;
          font-size: 1.4rem;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: -0.025em;
          text-align: left;
        }

        .navbar-mobile-toggle {
          display: none;
          background: #1e293b;
          color: #ffffff;
          border: 2px solid #334155;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 1.25rem;
          cursor: pointer;
        }

        .navbar-nav {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-link {
          background: transparent;
          border: none;
          color: #cbd5e1;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.2s ease;
          text-align: left;
        }

        .navbar-link:hover {
          color: #38bdf8;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-role-btn {
          background: #1e293b;
          color: #38bdf8;
          border: 2px solid #334155;
          padding: 0.55rem 1rem;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
        }

        .navbar-register-btn {
          background: #0284c7;
          color: #ffffff;
          border: none;
          padding: 0.65rem 1.25rem;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
        }

        .navbar-avatar {
          background: #1e293b;
          border: 2px solid #334155;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0;
          transition: border-color 0.2s ease;
        }

        .navbar-avatar:hover {
          border-color: #38bdf8;
        }

        /* Contenedor específico para opciones móviles adicionales */
        .navbar-mobile-actions {
          display: none;
          width: 100%;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #334155;
        }

        /* Diseño Responsive para pantallas medianas y móviles */
        @media (max-width: 900px) {
          .navbar-mobile-toggle {
            display: block;
          }

          .navbar-actions {
            display: none;
          }

          .navbar-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #0f172a;
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem 2rem;
            border-bottom: 2px solid #334155;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            box-sizing: border-box;
            gap: 0.75rem;
          }

          .navbar-nav.open {
            display: flex;
          }

          .navbar-mobile-actions {
            display: flex;
          }
        }
      `}</style>

      <header className="navbar-container">
        {/* Logotipo / Marca principal */}
        <button 
          type="button" 
          onClick={() => handleNavClick('/')}
          className="navbar-brand"
        >
          Code Crafters <span style={{ color: '#38bdf8' }}>2026</span>
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
              style={{ width: '100%', textAlign: 'center' }}
            >
              Rol: {userRole === 'organizer' ? 'Organizador' : 'Asistente'}
            </button>

            <button 
              type="button" 
              onClick={() => handleNavClick('/register')} 
              className="navbar-register-btn"
              style={{ width: '100%', textAlign: 'center' }}
            >
              Registro
            </button>

            <button 
              type="button"
              style={{ 
                background: 'transparent', 
                border: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                cursor: 'pointer', 
                padding: '0.5rem 0',
                width: '100%'
              }}
              onClick={() => handleNavClick('/profile')}
            >
              <span className="navbar-avatar" style={{ width: '36px', height: '36px', fontSize: '1rem' }}>
                👤
              </span>
              <span style={{ fontWeight: '700', color: '#cbd5e1' }}>Mi Perfil ({userRole})</span>
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
    </>
  );
};

export default Navbar;