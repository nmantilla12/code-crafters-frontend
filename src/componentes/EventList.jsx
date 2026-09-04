// src/componentes/EventList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventItem from './EventItem';
import { eventsData } from '../data/eventsData';

const EventList = ({ events: propEvents }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    // 1. Si el componente padre pasa eventos válidos, los usamos
    if (propEvents && Array.isArray(propEvents) && propEvents.length > 0) {
      setEvents(propEvents);
      return;
    }

    // 2. Si hay datos guardados en el localStorage, los comprobamos
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

    // 3. Por defecto absoluto: cargamos tus datos reales
    setEvents(eventsData);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(eventsData));
  }, [propEvents]);

  const handleCreateRedirect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/organizer/create-event');
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // Botón Gestionar: Redirige a la vista de edición o gestión del evento
  const handleManage = (id) => {
    console.log('Gestionar evento:', id);
    navigate(`/organizer/edit-event/${id}`); 
    // Nota: Si en lugar de editar quieres eliminarlo voluntariamente, 
    // puedes usar una función de borrado específica aquí o añadir un botón de papelera.
  };

  // Botón Inscribirme: Da feedback visual al usuario
  const handleRegister = (id) => {
    const eventToRegister = events.find(e => (e.id || e._id) === id);
    const eventTitle = eventToRegister ? eventToRegister.title : 'el evento';
    
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
      alert(`¡Te has inscrito exitosamente a "${eventTitle}"!`);
    } else {
      alert(`Ya estás inscrito en este evento.`);
    }
  };

  return (
    <section className="event-list-section">
      <div className="event-list__wrapper">
        
        {/* Cabecera superior con flujo integrado */}
        <div className="event-list__header-row">
          <div className="event-list__nav-group">
            <button 
              type="button"
              className="event-list__btn-back"
              onClick={handleBack}
            >
              ← Volver
            </button>
          </div>

          <h3 className="event-list__title">Eventos Disponibles y Gestión</h3>
          
          <div className="event-list__actions-group">
            <button 
              type="button"
              className="event-list__btn-create"
              onClick={handleCreateRedirect}
            >
              + Crear Evento
            </button>
          </div>
        </div>
        
        {events.length === 0 ? (
          <p className="event-list__empty">
            No hay eventos creados todavía. Explora el catálogo o crea un nuevo evento para comenzar.
          </p>
        ) : (
          <div className="event-list__container">
            {events.map((event) => {
              const eventId = event.id || event._id;

              return (
                <EventItem 
                  key={eventId}
                  event={event}
                  onManage={handleManage}
                  onRegister={handleRegister}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;