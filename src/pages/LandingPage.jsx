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
            <a href="#privacy" className="footer-interactive-link">Privacy Policy</a>
            <a href="#terms" className="footer-interactive-link">Terms of Service</a>
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

      {/* Estilos CSS corregidos y limpios */}
      <style>{`
        .landing-page__logo {
          color: #ffffff;
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.01em;
        }

        .landing-page__nav-links a {
          color: #94a3b8;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .landing-page__nav-links a:hover {
          color: #38bdf8;
          text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
        }

        .hero__title,
        .section__title-tech,
        .node-card__title {
          color: #38bdf8;
          text-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
          transition: all 0.3s ease;
        }

        .hero__title:hover,
        .section__title-tech:hover,
        .node-card__title:hover {
          text-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
        }

        .hero__title {
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }

        .section__title-tech {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          text-align: center;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }

        .section__desc-tech {
          font-size: 1.05rem;
          color: #94a3b8;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.6;
        }

        .node-card__title {
          font-size: 1.45rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .metric-box {
          background: #0b0f19;
          padding: 0.85rem 1.15rem;
          border-radius: 10px;
          border: 1px solid rgba(56, 189, 248, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        .metric-box:hover {
          border-color: #38bdf8;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
          transform: translateY(-2px);
        }

        .metric-box__title {
          font-size: 0.9rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .metric-box__value {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .metric-box__value--cyan { color: #00f0ff; text-shadow: 0 0 8px rgba(0, 240, 255, 0.4); }
        .metric-box__value--green { color: #10b981; text-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
        .metric-box__value--amber { color: #f59e0b; text-shadow: 0 0 8px rgba(245, 158, 11, 0.4); }

        .stats-preview-section {
          width: 100%;
          padding: 3.5rem 1.5rem;
          margin: 3rem 0;
          background: linear-gradient(180deg, rgba(11, 19, 43, 0.4) 0%, rgba(6, 9, 24, 0.8) 100%);
          border-top: 1px solid rgba(56, 189, 248, 0.2);
          border-bottom: 1px solid rgba(56, 189, 248, 0.2);
          box-sizing: border-box;
        }

        .stats-preview-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: center;
        }

        .stat-box {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .stat-box:hover {
          transform: translateY(-5px);
          border-color: #38bdf8;
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.35);
          background: rgba(30, 41, 59, 0.8);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #38bdf8;
          text-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 1rem;
          color: #94a3b8;
          font-weight: 600;
        }

        .landing-page__footer {
          width: 100%;
          background: #060918;
          padding: 3rem 2rem;
          border-top: 1px solid rgba(56, 189, 248, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          box-sizing: border-box;
          text-align: center;
          margin-top: auto;
        }

        .landing-page__footer-copy {
          margin: 0;
          font-size: 1rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .landing-page__footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }

        .footer-interactive-link {
          color: #38bdf8;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.25);
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .footer-interactive-link:hover {
          color: #ffffff;
          background: #1e3a8a;
          border-color: #38bdf8;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .stats-preview-container {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .stat-box {
            padding: 1.5rem;
          }

          .stat-value {
            font-size: 2rem;
          }

          .landing-page__footer-links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            width: 100%;
            max-width: 340px;
            gap: 0.75rem;
          }

          .footer-interactive-link {
            text-align: center;
            display: block;
            width: 100%;
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;