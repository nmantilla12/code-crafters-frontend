// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventList from '../componentes/EventList';
// Importamos tu JSON por defecto por si el localStorage está vacío
import initialData from '../data/events.json';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Estado local para los eventos sincronizados con localStorage
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CARGAR EVENTOS DESDE LOCALSTORAGE O JSON LOCAL ---
  useEffect(() => {
    const savedEvents = localStorage.getItem('codeCraftersEvents');
    
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Si es la primera vez, cargamos el JSON y lo guardamos en localStorage
      setEvents(initialData.events);
      localStorage.setItem('codeCraftersEvents', JSON.stringify(initialData.events));
    }
    setLoading(false);
  }, []);

  // Función para eliminar un evento y actualizar el almacenamiento local al instante
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));
  };

  return (
    <div className="dashboard-page">
      
      {/* 1. Navbar Superior del Panel */}
      <header className="dashboard-page__navbar">
        <button 
          type="button" 
          className="dashboard-page__logo-btn" 
          onClick={() => navigate('/')}
        >
          Code Crafters 2026
        </button>

        <nav className="dashboard-page__nav-links">
          <button type="button" onClick={() => navigate('/discover')} className="dashboard-page__nav-item">Descubrir</button>
          <button type="button" onClick={() => navigate('/events')} className="dashboard-page__nav-item">Eventos</button>
          <button type="button" onClick={() => navigate('/organizer/dashboard')} className="dashboard-page__nav-item dashboard-page__nav-item--active">Dashboard</button>
          <button type="button" onClick={() => navigate('/support')} className="dashboard-page__nav-item">Soporte</button>
        </nav>

        <div className="dashboard-page__actions">
          <button type="button" className="btn-login" onClick={() => navigate('/login')}>Login</button>
          <button type="button" className="btn-register" onClick={() => navigate('/register')}>Registrarse</button>
        </div>
      </header>

      {/* 2. Contenido Principal del Panel */}
      <main className="dashboard-page__content">
        <div className="dashboard-page__header">
          <div>
            <h1 className="dashboard-page__title">Panel de Control y Gestión</h1>
            <p className="dashboard-page__subtitle">Administra los eventos de la plataforma sincronizados localmente.</p>
          </div>
          
          {/* Botón real de Creación de Eventos */}
          <button 
            type="button" 
            onClick={() => navigate('/organizer/create-event')} 
            className="dashboard-page__btn-create"
          >
            + Crear Nuevo Evento
          </button>
        </div>
        
        {/* Mensaje de carga */}
        {loading && <p className="dashboard-page__loading">Cargando eventos...</p>}

        {/* Renderizamos la lista modular pasando los datos del state */}
        {!loading && (
          <div className="dashboard-page__container-list">
            <EventList events={events} onDelete={handleDeleteEvent} />
          </div>
        )}
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