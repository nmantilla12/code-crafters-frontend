// src/componentes/EventList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventItem from './EventItem';
import { eventsData } from '../data/eventsData';

const EventList = ({ events: propEvents, onDelete, userRole }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (propEvents && Array.isArray(propEvents) && propEvents.length > 0) {
      setEvents(propEvents);
      return;
    }

    const savedEvents = localStorage.getItem('codeCraftersEvents');
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents);
        if (Array.isArray(parsed)) {
          setEvents(parsed);
          return;
        }
      } catch (e) {
        console.error('Error al leer el localStorage', e);
      }
    }

    setEvents(eventsData);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(eventsData));
  }, [propEvents]);

  // Función local para eliminar un evento y actualizar localStorage de inmediato
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => (event.id || event._id) !== id);
    setEvents(updatedEvents);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));
    if (onDelete) onDelete(id);
  };

  return (
    <section className="event-list-section">
      <div className="event-list__wrapper">
        
        {/* Acciones principales del organizador en la parte superior */}
        <div className="event-list__top-actions">
          {userRole === 'organizer' && (
            <button 
              type="button" 
              onClick={() => navigate('/organizer/create-event')} 
              className="event-list__btn event-list__btn--create"
            >
              ➕ Crear Evento
            </button>
          )}
        </div>

        {events.length === 0 ? (
          <p className="event-list__empty">
            No hay eventos disponibles en este momento.
          </p>
        ) : (
          <div className="dashboard-grid">
            {events.map((event) => {
              const eventId = event.id || event._id;

              return (
                <EventItem 
                  key={eventId}
                  event={event}
                  onDelete={userRole === 'organizer' ? () => handleDeleteEvent(eventId) : null}
                  userRole={userRole}
                />
              );
            })}
          </div>
        )}

        {/* Barra inferior: Volver al inicio y "Siguiente" directo a Soporte */}
        <div className="event-list__actions-bar">
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="event-list__btn event-list__btn--back"
          >
            ← Volver al inicio
          </button>

          <button 
            type="button" 
            onClick={() => navigate('/support')} 
            className="event-list__btn event-list__btn--next"
          >
            Siguiente (Soporte) →
          </button>
        </div>

      </div>
    </section>
  );
};

export default EventList;