// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventList from '../componentes/EventList';
import MetricCard from '../componentes/MetricCard'; // <--- 1. Importamos el componente de métricas
// Importamos tu JSON por defecto por si el localStorage está vacío
import initialData from '../data/events.json';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Estado local para los eventos sincronizados con localStorage
  const [events, setEvents] = useState([]);
  const [totalAttendees, setTotalAttendees] = useState(0); // <--- 2. Estado para los asistentes
  const [loading, setLoading] = useState(true);

  // --- CARGAR EVENTOS DESDE LOCALSTORAGE O JSON LOCAL ---
  useEffect(() => {
    const savedEvents = localStorage.getItem('codeCraftersEvents');
    let eventsList = [];
    
    if (savedEvents) {
      eventsList = JSON.parse(savedEvents);
      setEvents(eventsList);
    } else {
      // Si es la primera vez, cargamos el JSON y lo guardamos en localStorage
      eventsList = initialData.events;
      setEvents(eventsList);
      localStorage.setItem('codeCraftersEvents', JSON.stringify(initialData.events));
    }

    // Calculamos el total de asistentes para la tarjeta de métrica
    const attendeesSum = eventsList.reduce((acc, ev) => {
      return acc + Number.parseInt(ev.attendees || 0, 10);
    }, 0);
    setTotalAttendees(attendeesSum);

    setLoading(false);
  }, []);

  // Función para eliminar un evento, actualizar el almacenamiento local y recalcular métricas al instante
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => (event.id || event._id) !== id);
    setEvents(updatedEvents);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));

    const newAttendeesSum = updatedEvents.reduce((acc, ev) => {
      return acc + Number.parseInt(ev.attendees || 0, 10);
    }, 0);
    setTotalAttendees(newAttendeesSum);
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

      {/* 3. ¡CUADRÍCULA DE MÉTRICAS MODERNA ANTES DEL FOOTER! */}
      <section style={{ width: '100%', maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem', boxSizing: 'border-box' }}>
        <div className="dashboard-metrics-grid">
          <MetricCard 
            title="Eventos Totales" 
            value={events.length} 
            change="+12%" 
            isPositive={true} 
          />
          <MetricCard 
            title="Asistentes Inscritos" 
            value={totalAttendees} 
            change="0%" 
            isPositive={true} 
          />
          <MetricCard 
            title="Estado del Almacenamiento" 
            value="Sincronizado" 
            change="100%" 
            isPositive={true} 
          />
        </div>
      </section>

      {/* 4. Footer */}
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