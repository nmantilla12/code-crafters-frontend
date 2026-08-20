import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../componentes/MetricCard';
import EventList from '../componentes/EventList';

const Dashboard = () => {
  const navigate = useNavigate();

  // Estado para almacenar los eventos del panel de forma dinámica
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('dashboard_events');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }
    return [
      { 
        id: 1, 
        title: 'Taller de React y BEM', 
        date: '24 Ago 2026', 
        status: 'Publicado' 
      },
      { 
        id: 2, 
        title: 'Conferencia de Frontend', 
        date: '30 Ago 2026', 
        status: 'Borrador' 
      },
    ];
  });

  // Estado para el buscador en tiempo real
  const [searchTerm, setSearchTerm] = useState('');

  // Función para eliminar un evento por su ID
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('dashboard_events', JSON.stringify(updatedEvents));
  };

  // Filtrar los eventos según el texto introducido en el buscador
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      {/* 1. Navbar Superior del Panel */}
      <header className="dashboard-page__navbar">
        {/* Botón del logo accesible */}
        <button 
          type="button" 
          className="dashboard-page__logo-btn" 
          onClick={() => navigate('/')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0', color: 'inherit', font: 'inherit' }}
        >
          Code Crafters 2026
        </button>

        <nav className="dashboard-page__nav-links">
          <button 
            type="button" 
            onClick={() => navigate('/discover')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
          >
            Descubrir
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/events')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
          >
            Eventos
          </button>
          <button 
            type="button" 
            className="active"
            onClick={() => navigate('/organizer/dashboard')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
          >
            Dashboard
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/support')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
          >
            Soporte
          </button>
        </nav>

        <div className="dashboard-page__actions">
          <button type="button" className="btn-login" onClick={() => navigate('/login')}>
            Login
          </button>
          <button type="button" className="btn-register" onClick={() => navigate('/register')}>
            Registrarse
          </button>
        </div>
      </header>

      {/* 2. Contenido Principal del Panel */}
      <main className="dashboard-page__content">
        <div className="dashboard-page__header">
          <div>
            <h1 className="dashboard-page__title">1. Panel del Organizador</h1>
            <span className="dashboard-page__subtitle">GESTIÓN CENTRAL DE EVENTOS TECH</span>
          </div>
          <button 
            type="button" 
            className="dashboard-page__btn-create"
            onClick={() => navigate('/organizer/create-event')}
          >
            + Crear Nuevo Evento
          </button>
        </div>
        
        {/* Sección de tarjetas de métricas y acciones rápidas */}
        <section className="dashboard-page__metrics">
          <MetricCard />
          
          <div className="quick-actions-card">
            <span className="quick-actions-title">ACCIONES RÁPIDAS</span>
            <button type="button" className="action-item">Ver Dashboard Analítico 📊</button>
            <button type="button" className="action-item">Exportar Datos (CSV) 📥</button>
            <button type="button" className="action-item">Configuración de API ⚙️</button>
          </div>
        </section>

        {/* Sección de listado de eventos activos (incluyendo la barra de búsqueda y los eventos filtrados) */}
        <section className="dashboard-page__events">
          <div className="dashboard-page__search-container" style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              className="dashboard-page__search-input" 
              placeholder="Buscar evento..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '10px 15px', borderRadius: '6px', width: '100%', background: '#131b2e', border: '1px solid #1f293d', color: '#fff' }}
            />
          </div>
          <EventList events={filteredEvents} onDelete={handleDeleteEvent} />
        </section>
      </main>

      {/* 3. Footer */}
      <footer className="dashboard-page__footer">
        <p>© 2026 Code Crafters. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#privacidad">Privacidad</a>
          <a href="#terminos">Términos</a>
          <a href="#contacto">Contacto</a>
          <a href="#faq">FAQ</a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;