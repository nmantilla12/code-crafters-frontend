// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TicketQR from '../componentes/TicketQR';
import NotificationsCenter from '../componentes/NotificationsCenter';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page" style={{ background: '#0b1120', minHeight: '100vh', padding: '2rem 3rem', color: '#fff' }}>
      
      {/* 1. Navbar Superior del Panel */}
      <header className="dashboard-page__navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button 
          type="button" 
          className="dashboard-page__logo-btn" 
          onClick={() => navigate('/')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}
        >
          Code Crafters 2026
        </button>

        <nav className="dashboard-page__nav-links" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => navigate('/discover')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>Descubrir</button>
          <button type="button" onClick={() => navigate('/events')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>Eventos</button>
          <button type="button" className="active" onClick={() => navigate('/organizer/dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff', fontWeight: 'bold' }}>Dashboard</button>
          <button type="button" onClick={() => navigate('/support')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>Soporte</button>
        </nav>

        <div className="dashboard-page__actions" style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" className="btn-login" onClick={() => navigate('/login')} style={{ background: 'transparent', border: '1px solid #334155', color: '#fff', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Login</button>
          <button type="button" className="btn-register" onClick={() => navigate('/register')} style={{ background: '#06b6d4', border: 'none', color: '#0f172a', padding: '0.4rem 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Registrarse</button>
        </div>
      </header>

      {/* 2. Contenido Principal del Panel (Mis Actividades y Notificaciones) */}
      <main className="dashboard-page__content">
        <div className="dashboard-page__header" style={{ marginBottom: '2rem' }}>
          <h1 className="dashboard-page__title" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>4. Mis Actividades y Notificaciones</h1>
          <p className="dashboard-page__subtitle" style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Gestiona tus eventos registrados, accede a tus tickets y mantente al día con las últimas actualizaciones.</p>
        </div>
        
        {/* Layout en dos columnas limpio y modular */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
          <div>
            <TicketQR />
          </div>
          <div>
            <NotificationsCenter />
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="dashboard-page__footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5rem', borderTop: '1px solid #1e293b', paddingTop: '1.5rem', color: '#64748b', fontSize: '0.85rem', flexWrap: 'wrap', gap: '1rem' }}>
        <p>© 2026 Code Crafters. Todos los derechos reservados.</p>
        <div className="footer-links" style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#privacidad" style={{ color: '#64748b', textDecoration: 'none' }}>Privacidad</a>
          <a href="#terminos" style={{ color: '#64748b', textDecoration: 'none' }}>Términos</a>
          <a href="#contacto" style={{ color: '#64748b', textDecoration: 'none' }}>Contacto</a>
          <a href="#faq" style={{ color: '#64748b', textDecoration: 'none' }}>FAQ</a>
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;