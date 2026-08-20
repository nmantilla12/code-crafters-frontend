import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../componentes/MetricCard';
import EventList from '../componentes/EventList';

const Dashboard = () => {
  const navigate = useNavigate();

  // Estado para almacenar los eventos del panel de forma dinámica
  const [events, setEvents] = useState([
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
  ]);

  // Función para eliminar un evento por su ID
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="dashboard-page">
      {/* 1. Navbar Superior del Panel */}
      <header className="dashboard-page__navbar">
        {/* Cambiado el div por un botón transparente y accesible */}
        <button 
          type="button" 
          className="dashboard-page__logo-btn" 
          onClick={() => navigate('/')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0', color: 'inherit', font: 'inherit' }}
        >
          Code Crafters 2026
        </button>

        <nav className="dashboard-page__nav-links">
          <a href="#descubrir">Descubrir</a>
          <a href="#eventos">Eventos</a>
          <a href="#dashboard" className="active">Dashboard</a>
          <a href="#soporte">Soporte</a>
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

        {/* Sección de listado de eventos activos (pasándole eventos y la función de borrado) */}
        <section className="dashboard-page__events">
          <EventList events={events} onDelete={handleDeleteEvent} />
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