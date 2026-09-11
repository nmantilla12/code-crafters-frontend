// src/componentes/EventList.jsx
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

        {/* Barra inferior con los tres botones grandes, en línea y en color cian */}
        <div 
          className="event-list__actions-bar" 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: '40px', 
            flexWrap: 'wrap', 
            gap: '15px' 
          }}
        >
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            style={{
              backgroundColor: '#06b6d4',
              color: '#0b0f19',
              fontSize: '1rem',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            ← Volver al inicio
          </button>

          <button 
            type="button"
            onClick={() => navigate('/organizer/create-event')}
            style={{
              backgroundColor: '#06b6d4',
              color: '#0b0f19',
              fontSize: '1rem',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            + Crear Evento ⚙️
          </button>

          <button 
            type="button" 
            onClick={() => navigate('/support')} 
            style={{
              backgroundColor: '#06b6d4',
              color: '#0b0f19',
              fontSize: '1rem',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Siguiente (Soporte) →
          </button>
        </div>

      </div>
    </section>
  );
};

export default EventList;