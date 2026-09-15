import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventItem from './EventItem';
import { eventsData } from '../data/eventsData';

const EventList = ({ events: propEvents, onManage, onDelete, userRole }) => {
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

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => (event.id || event._id) !== id);
    setEvents(updatedEvents);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));
    if (onDelete) onDelete(id);
  };

  const handleManageEvent = (id) => {
    if (onManage) {
      onManage(id);
    } else {
      navigate(`/organizer/edit-event/${id}`);
    }
  };

  return (
    <section className="event-list-section">
      <div className="event-list__wrapper">
        
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
                  onManage={() => handleManageEvent(eventId)}
                  onDelete={() => handleDeleteEvent(eventId)}
                  userRole={userRole}
                />
              );
            })}
          </div>
        )}

        {/* Barra inferior con clases puras, sin estilos en línea */}
        <div className="event-list__actions-bar">
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="event-list__btn event-list__btn--secondary"
          >
            ← Volver al inicio
          </button>

          <button 
            type="button"
            onClick={() => navigate('/organizer/create-event')}
            className="event-list__btn event-list__btn--primary"
          >
            + Crear Evento ⚙️
          </button>

          <button 
            type="button" 
            onClick={() => navigate('/organizer/buzon-quejas')} 
            className="event-list__btn event-list__btn--secondary"
          >
            Buzón de Quejas o Sugerencias →
          </button>
        </div>

      </div>
    </section>
  );
};

export default EventList;