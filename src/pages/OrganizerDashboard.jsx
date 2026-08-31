// src/pages/OrganizerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import initialData from '../data/events.json';
import EventList from '../componentes/EventList';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [totalAttendees, setTotalAttendees] = useState(0);

  // Cargamos los eventos reales desde el localStorage (o del JSON inicial si está vacío)
  useEffect(() => {
    const savedEvents = localStorage.getItem('codeCraftersEvents');
    const eventsList = savedEvents ? JSON.parse(savedEvents) : initialData.events;
    
    setEvents(eventsList);
    
    // Calculamos el total de asistentes sumando la propiedad attendees de cada evento
    const attendeesSum = eventsList.reduce((acc, ev) => {
      return acc + Number.parseInt(ev.attendees || 0, 10);
    }, 0);
    
    setTotalAttendees(attendeesSum);
  }, []);

  // Función para eliminar un evento y actualizar métricas al instante
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));

    // Recalculamos asistentes al eliminar
    const newAttendeesSum = updatedEvents.reduce((acc, ev) => {
      return acc + Number.parseInt(ev.attendees || 0, 10);
    }, 0);
    setTotalAttendees(newAttendeesSum);
  };

  return (
    <div className="dashboard-page" style={{ 
      background: '#0b1120', 
      minHeight: '100vh', 
      color: '#fff', 
      padding: '2rem 1rem', 
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      
      {/* Contenedor centralizador principal para evitar el desplazamiento a la izquierda */}
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* 1. Barra de Navegación del Dashboard */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>
            Code Crafters | Panel de Control
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={() => navigate('/events')} 
              style={{ background: 'transparent', border: '1px solid #334155', color: '#cbd5e1', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
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
        <section style={{ marginBottom: '2.5rem', width: '100%' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', marginTop: 0 }}>¡Bienvenido al Panel! 👋</h2>
          <p style={{ color: '#94a3b8', margin: 0 }}>Desde aquí puedes supervisar tus eventos creados y gestionar la actividad de la plataforma.</p>
        </section>

        {/* Tarjetas de Estadísticas Dinámicas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '10px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Eventos Totales</p>
            <h3 style={{ fontSize: '2rem', color: '#38bdf8', margin: 0 }}>{events.length}</h3>
          </div>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '10px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Asistentes Inscritos</p>
            <h3 style={{ fontSize: '2rem', color: '#34d399', margin: 0 }}>{totalAttendees}</h3>
          </div>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '10px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Estado del Almacenamiento</p>
            <h3 style={{ fontSize: '1.2rem', color: '#facc15', margin: '0.5rem 0 0 0' }}>🟢 Sincronizado</h3>
          </div>
        </div>

        {/* 3. Listado de Eventos con la cuadrícula, tarjetas y botones de gestión/eliminación */}
        <section style={{ marginTop: '2rem', width: '100%' }}>
          <EventList events={events} onDelete={handleDeleteEvent} />
        </section>

        {/* 4. Barra de Navegación Interactiva (Volver / Siguiente) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #1e293b',
          flexWrap: 'wrap',
          gap: '1rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <button 
            type="button"
            onClick={() => navigate(-1)}
            style={{
              background: '#1e293b',
              border: '1px solid #475569',
              color: '#f8fafc',
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Volver
          </button>

          <button 
            type="button"
            onClick={() => navigate('/events')}
            style={{
              background: '#0284c7',
              border: 'none',
              color: '#ffffff',
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Siguiente (Explorar Eventos) →
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrganizerDashboard;