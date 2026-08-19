import React from 'react';
import TicketQR from '../componentes/TicketQR';
import NotificationsCenter from '../componentes/NotificationsCenter';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* 1. Navbar Superior */}
      <header className="landing-page__navbar">
        <div className="landing-page__logo">Code Crafters 2026</div>
        <nav className="landing-page__nav-links">
          <a href="#discovery" className="active">Discovery</a>
          <a href="#tickets">My Tickets</a>
          <a href="#support">Support</a>
        </nav>
        <div className="landing-page__actions">
          <button type="button" className="landing-page__btn-register">Register</button>
          <span className="landing-page__user-avatar">👤</span>
        </div>
      </header>

      {/* 2. Hero Section (Inspirado en tu diseño de doble ecosistema) */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__badge">Sistema Operativo para Eventos Tech</span>
          <h1 className="hero__title">El Doble Ecosistema para la Excelencia en Eventos.</h1>
          <p className="hero__subtitle">
            Una plataforma unificada. Dos experiencias de alto rendimiento. Para organizadores que exigen control absoluto y espectadores que buscan descubrimiento sin fricción.
          </p>
          <div className="hero__buttons">
            <button type="button" className="hero__btn-primary">Explorar Plataforma ↗</button>
            <button type="button" className="hero__btn-secondary">Ver Documentación &lt;&gt;</button>
          </div>
        </div>
        <div className="hero__graphic">
          {/* Aquí puedes integrar una vista previa o tarjeta destacada */}
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
          {/* Columna Organizadores */}
          <div className="node-card">
            <h3>Para Organizadores</h3>
            <p>Control total sobre la infraestructura del evento y telemetría en tiempo real.</p>
          </div>

          {/* Columna Espectadores (¡Aquí puedes integrar tu TicketQR y Notificaciones!) */}
          <div className="node-card">
            <h3>Para Espectadores</h3>
            <p>Experiencia fluida, check-in optimizado y control de accesos.</p>
            
            {/* Integración de tu componente TicketQR ya hecho */}
            <div className="node-card__preview">
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
      <section className="notifications-section">
        <NotificationsCenter />
      </section>

      {/* 5. Footer */}
      <footer className="landing-page__footer">
        <p>© 2026 Code Crafters. Built for the Dev Community.</p>
        <div className="landing-page__footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#github">Github</a>
          <a href="#discord">Discord</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;