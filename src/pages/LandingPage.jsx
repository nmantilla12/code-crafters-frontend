import React from 'react';
import { useNavigate } from 'react-router-dom';
import TicketQR from '../componentes/TicketQR';
import NotificationsCenter from '../componentes/NotificationsCenter';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate('/organizer/dashboard');
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleNavigateToExplore = () => {
    navigate('/events');
  };

  const handleNavigateToSupport = () => {
    navigate('/support');
  };

  return (
    <div className="landing-page">
      {/* 1. Navbar Superior */}
      <header className="landing-page__navbar">
        <div className="landing-page__logo">Code Crafters 2026</div>
        <nav className="landing-page__nav-links">
          <a href="#discovery" className="active">Discovery</a>
          <a href="#tickets">My Tickets</a>
          <button 
            type="button" 
            onClick={handleNavigateToSupport}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 'inherit', padding: 0 }}
          >
            Support
          </button>
        </nav>
        <div className="landing-page__actions">
          <button 
            type="button" 
            className="landing-page__btn-register"
            onClick={handleNavigateToRegister}
          >
            Register
          </button>
          <button 
            type="button" 
            className="landing-page__user-avatar-btn" 
            title="Iniciar Sesión" 
            onClick={handleNavigateToLogin}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0' }}
          >
            👤
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="hero" id="discovery">
        <div className="hero__content">
          <span className="hero__badge">Sistema Operativo para Eventos Tech</span>
          <h1 className="hero__title">El Doble Ecosistema para la Excelencia en Eventos.</h1>
          <p className="hero__subtitle">
            Una plataforma unificada. Dos experiencias de alto rendimiento. Para organizadores que exigen control absoluto y espectadores que buscan descubrimiento sin fricción.
          </p>
          <div className="hero__buttons">
            <button 
              type="button" 
              className="hero__btn-primary"
              onClick={handleNavigateToExplore}
            >
              Explorar Plataforma ↗
            </button>
            <a href="#tickets" className="hero__btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Ver Documentación &lt;&gt;
            </a>
          </div>
        </div>
        <div className="hero__graphic">
          <div className="hero__metric-card">
            <p>Live Attendees</p>
            <h3>2,048</h3>
            <span className="status-online">● ONLINE</span>
          </div>
        </div>
      </section>

      {/* 3. Sección de Arquitectura y Componentes Reutilizados */}
      <section className="architecture" id="tickets">
        <div className="architecture__header">
          <h2>Arquitectura de Doble Nodo</h2>
          <p>Diseñada como dos interfaces especializadas que operan sobre una base de datos centralizada de alto rendimiento.</p>
        </div>

        <div className="architecture__grid">
          <button 
            type="button" 
            className="node-card node-card--interactive" 
            onClick={handleNavigateToDashboard}
            style={{ cursor: 'pointer', textAlign: 'left', width: '100%', border: '1px solid #334155', background: '#1e293b', padding: '2rem', borderRadius: '12px', color: 'inherit', font: 'inherit', transition: 'border-color 0.2s' }}
          >
            <h3>Para Organizadores</h3>
            <p style={{ marginTop: '1rem', color: '#94a3b8' }}>Control total sobre la infraestructura del evento y telemetría en tiempo real. (Haz clic para acceder al panel)</p>
          </button>

          <div className="node-card" style={{ background: '#1e293b', border: '1px solid #334155', padding: '2rem', borderRadius: '12px' }}>
            <h3>Para Espectadores</h3>
            <p style={{ marginTop: '1rem', color: '#94a3b8' }}>Experiencia fluida, check-in optimizado y control de accesos.</p>
            
            <div className="node-card__preview" style={{ marginTop: '1.5rem' }}>
              <TicketQR 
                eventTitle="DevCon 2026" 
                eventDate="2026-09-15" 
                ticketId="0x9A4F...2B" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sección del Centro de Notificaciones */}
      <section className="notifications-section" style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <NotificationsCenter />
      </section>

      {/* 5. Footer */}
      <footer className="landing-page__footer">
        <p>© 2026 Code Crafters. Built for the Dev Community.</p>
        <div className="landing-page__footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#github" target="_blank" rel="noreferrer">Github</a>
          <a href="#discord" target="_blank" rel="noreferrer">Discord</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;