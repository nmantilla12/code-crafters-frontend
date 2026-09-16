// src/componentes/EventList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventItem from './EventItem';
import Footer from './Footer'; // 1. Importa tu componente Footer
import { eventsData } from '../data/eventsData';

const EventList = ({ events: propEvents, onManage, onDelete, onAddToCart, userRole }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Determinamos si el componente está actuando bajo el rol de espectador
  const isSpectator = userRole === 'spectator' || Boolean(onAddToCart);

  useEffect(() => {
    if (propEvents && Array.isArray(propEvents) && propEvents.length > 0) {
      setEvents(propEvents);
      return;
    }

    // Si es organizador, tira del localStorage de codeCraftersEvents
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
    if (!isSpectator) {
      localStorage.setItem('CodeCraftersEvents', JSON.stringify(eventsData));
    }
  }, [propEvents, isSpectator]);

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => (event.id || event._id) !== id);
    setEvents(updatedEvents);
    localStorage.setItem('CodeCraftersEvents', JSON.stringify(updatedEvents));
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
    <div className="event-page-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <section className="event-list-section" style={{ flex: 1 }}>
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
                    userRole={userRole}
                    // Si es espectador le pasamos la acción de comprar, si es organizador las de gestión
                    onAddToCart={onAddToCart ? () => onAddToCart(event) : undefined}
                    onManage={!isSpectator ? () => handleManageEvent(eventId) : undefined}
                    onDelete={!isSpectator ? () => handleDeleteEvent(eventId) : undefined}
                  />
                );
              })}
            </div>
          )}

          {/* BARRA INFERIOR: Solo se muestra si es el panel del Organizador */}
          {!isSpectator && (
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
          )}

        </div>
      </section>

      {/* 2. El Footer integrado al final de la página del espectador/eventos */}
      <Footer />
    </div>
  );
};

export default EventList;