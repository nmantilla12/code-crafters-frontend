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
    <div className="explore-events-page">
      <div className="explore-events__container">
        {loading && <p className="event-list__loading">Cargando eventos...</p>}
        {error && <p className="explore-events__error">Error al cargar: {error}</p>}
        
        {!loading && !error && (
          <EventList events={events} />
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;