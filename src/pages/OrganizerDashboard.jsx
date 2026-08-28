// src/pages/OrganizerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import initialData from '../data/events.json';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalAttendees, setTotalAttendees] = useState(0);

  // Cargamos y calculamos las métricas reales desde localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('codeCraftersEvents');
    const eventsList = savedEvents ? JSON.parse(savedEvents) : initialData.events;
    
    setTotalEvents(eventsList.length);
    
    // Calculamos el total de asistentes sumando la propiedad attendees de cada evento
    const attendeesSum = eventsList.reduce((acc, ev) => {
      return acc + Number.parseInt(ev.attendees || 0, 10);
    }, 0);
    
    setTotalAttendees(attendeesSum);
  }, []);

  return (
    <div className="dashboard-page" style={{ background: '#0b1120', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      
      {/* 1. Barra de Navegación del Dashboard */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>
          Code Crafters | Panel de Control
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            type="button" 
            onClick={() => navigate('/events')} 
            style={{ background: 'transparent', border: '1px solid #334155', color: '#cbd5e1', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
          >
            Explorar Eventos
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/login')} 
            style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* 2. Sección de Bienvenida / Métricas rápidas */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>¡Bienvenido al Panel! 👋</h2>
        <p style={{ color: '#94a3b8' }}>Desde aquí puedes supervisar tus eventos creados y gestionar la actividad de la plataforma.</p>
      </section>

      {/* Tarjetas de Estadísticas Dinámicas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '10px', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Eventos Totales</p>
          <h3 style={{ fontSize: '2rem', color: '#38bdf8' }}>{totalEvents}</h3>
        </div>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '10px', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Asistentes Inscritos</p>
          <h3 style={{ fontSize: '2rem', color: '#34d399' }}>{totalAttendees}</h3>
        </div>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '10px', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Estado del Almacenamiento</p>
          <h3 style={{ fontSize: '1.2rem', color: '#facc15', marginTop: '0.5rem' }}>🟢 Sincronizado</h3>
        </div>
      </div>

      {/* 3. Acciones Rápidas */}
      <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', border: '1px solid #334155' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Gestión de Contenido</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Añade nuevos eventos para que aparezcan al instante en el catálogo de la plataforma.</p>
        <button 
          type="button"
          onClick={() => navigate('/create-event')} // Cambia esta ruta si tu vista de creación tiene otra ruta asignada en el router
          style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          + Crear Nuevo Evento
        </button>
      </div>

    </div>
  );
};

export default OrganizerDashboard;