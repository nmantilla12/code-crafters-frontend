import React, { useState } from 'react';
import EventForm from './EventForm';
import initialEvents from '../../data/events.json'; // Tu archivo json inicial

const OrganizerDashboard = () => {
  const [events, setEvents] = useState(initialEvents);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddEvent = (newEvent) => {
    // Añadimos un ID único y la estructura necesaria
    const eventWithId = {
      id: Date.now(),
      ...newEvent
    };

    setEvents([eventWithId, ...events]);
    
    // Feedback visual de éxito
    setSuccessMessage('¡Evento creado con éxito!');
    setTimeout(() => setSuccessMessage(''), 4000); // Se oculta a los 4 segundos
  };

  return (
    <div className="organizer-dashboard">
      <h2 className="organizer-dashboard__title">Panel del Organizador</h2>
      
      {/* Mensaje de éxito global para el flujo */}
      {successMessage && <div className="alert-success">{successMessage}</div>}

      <div className="organizer-dashboard__content">
        <EventForm onAddEvent={handleAddEvent} />
        
        {/* Listado de eventos creados para ver el flujo completo */}
        <div className="organizer-dashboard__list">
          <h3>Mis Eventos ({events.length})</h3>
          {events.map((event) => (
            <div key={event.id} className="event-card-mini">
              <h4>{event.title}</h4>
              <span>{event.date} - {event.location}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;