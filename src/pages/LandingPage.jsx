// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketQR from '../componentes/TicketQR';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="landing-page">
      <div className="landing-page__container">
        
        {/* Navbar */}
        <header className="landing-page__navbar">
          <div className="landing-page__nav-top">
            <div className="landing-page__logo">Code Crafters 2026</div>
            <button
              type="button"
              className="landing-page__menu-toggle"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          <nav className={`landing-page__nav-links ${isMenuOpen ? 'is-open' : ''}`}>
            <a href="#discovery" onClick={() => setIsMenuOpen(false)}>Discovery</a>
            <a href="#tickets" onClick={() => setIsMenuOpen(false)}>Tickets</a>
            <button 
              type="button" 
              onClick={() => handleNavigate('/support')}
              className="landing-page__nav-support-btn"
            >
              Support
            </button>
          </nav>

          <div className={`landing-page__actions ${isMenuOpen ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="landing-page__btn-register"
              onClick={() => handleNavigate('/register')}
            >
              Register
            </button>
            <button 
              type="button" 
              className="landing-page__user-avatar-btn" 
              title="Iniciar Sesión" 
              onClick={() => handleNavigate('/login')}
            >
              👤
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero" id="discovery">
          <div className="hero__content">
            <span className="hero__badge">
              Sistema Operativo para Eventos Tech
            </span>
            
            <h1 className="hero__title">
              El Doble Ecosistema para la Excelencia en Eventos.
            </h1>
            
            <p className="hero__subtitle">
              Una plataforma unificada. Dos experiencias de alto rendimiento. Para organizadores que exigen control absoluto y espectadores que buscan descubrimiento sin fricción.
            </p>

            <div className="hero__buttons">
              <button 
                type="button" 
                className="hero__btn-primary"
                onClick={() => handleNavigate('/events')}
              >
                Explorar Plataforma ↗
              </button>
              
              <button 
                type="button" 
                className="hero__btn-secondary" 
                onClick={() => handleNavigate('/support')}
              >
                Ver Documentación &lt;&gt;
              </button>
            </div>
          </div>
        </section>

        {/* Architecture Grid Section */}
        <section className="architecture" id="tickets">
          <div className="architecture__header">
            <h2 className="section__title-tech">
              Arquitectura de Doble Nodo
            </h2>
            <p className="section__desc-tech">Diseñada como dos interfaces especializadas que operan sobre una base de datos centralizada de alto rendimiento.</p>
          </div>

          <div className="architecture__grid">
            
            <article className="node-card card-border-interactive">
              <div className="node-card__text-content">
                <h3 className="node-card__title">
                  Para Organizadores
                </h3>
                <p className="node-card__desc">Control total sobre la infraestructura del evento y telemetría en tiempo real.</p>
              </div>
              
              <div className="node-card__preview" style={{ width: '100%', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="metric-box">
                  <span className="metric-box__title">⚡ Eventos Activos</span>
                  <span className="metric-box__value metric-box__value--cyan">14 en curso</span>
                </div>
                <div className="metric-box">
                  <span className="metric-box__title">👥 Asistencia Global</span>
                  <span className="metric-box__value metric-box__value--green">98.4% Check-in</span>
                </div>
                <div className="metric-box">
                  <span className="metric-box__title">🖥️ Latencia del Nodo</span>
                  <span className="metric-box__value metric-box__value--amber">12 ms</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', width: '100%' }}>
                <button 
                  type="button"
                  className="hero__btn-primary"
                  onClick={() => handleNavigate('/login')}
                  style={{ width: '100%', padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                >
                  Gestionar Organizadores ↗
                </button>
              </div>
            </article>

            <article className="node-card card-border-interactive">
              <div className="node-card__text-content">
                <h3 className="node-card__title">
                  Para Espectadores
                </h3>
                <p className="node-card__desc">Experiencia fluida, check-in optimizado y control de accesos.</p>
              </div>
              
              <div className="node-card__preview">
                <TicketQR 
                  eventTitle="DevCon 2026" 
                  eventDate="2026-09-15" 
                  ticketId="DEV-2026-9988"
                  eventId="1"
                />
              </div>

              <div style={{ marginTop: '1rem', width: '100%' }}>
                <button
                  type="button"
                  className="hero__btn-primary"
                  onClick={() => handleNavigate('/events')}
                  style={{ width: '100%', padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                >
                  Explorar Espectadores ↗
                </button>
              </div>
            </article>

          </div>
        </section>

        {/* Sección de Métricas de Impacto */}
        <section className="stats-preview-section">
          <div className="stats-preview-container">
            <div className="stat-box">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Uptime Garantizado</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">+50k</span>
              <span className="stat-label">Tickets Validados</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">0ms</span>
              <span className="stat-label">Fricción en Check-in</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-page__footer">
          <p className="landing-page__footer-copy">© 2026 Code Crafters. Built for the Dev Community.</p>
          <div className="landing-page__footer-links">
            <a href="#privacy" className="footer-interactive-link">Privacidad</a>
            <a href="#terms" className="footer-interactive-link">Términos</a>
            <a href="https://github.com/nmantilla12" target="_blank" rel="noreferrer" className="footer-interactive-link">Github</a>
            <a 
              href="#discord" 
              title="Discord: mantilla0624" 
              className="footer-interactive-link"
              onClick={(e) => { e.preventDefault(); alert('Usuario de Discord: mantilla0624'); }}
            >
              Discord
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default LandingPage;