// src/pages/ExploreEvents.jsx
import React, { useState, useEffect } from 'react';
import EventList from '../componentes/EventList';
import initialData from '../data/events.json';

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    try {
      setLoading(true);
      // Sincronizamos directamente con localStorage o el JSON por defecto
      const savedEvents = localStorage.getItem('codeCraftersEvents');
      const eventsList = savedEvents ? JSON.parse(savedEvents) : initialData.events;
      
      setEvents(eventsList);
      setError(null);
    } catch (err) {
      console.error("Fallo al obtener eventos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      width: '100%', 
      padding: '2rem 1.5rem', 
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {loading && <p className="event-list__loading" style={{ color: '#94a3b8' }}>Cargando eventos...</p>}
        {error && <p style={{ color: '#f87171', textAlign: 'center' }}>Error al cargar: {error}</p>}
        
        {!loading && !error && (
          <EventList events={events} />
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;