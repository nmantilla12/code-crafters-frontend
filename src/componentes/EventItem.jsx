// src/componentes/EventItem.jsx
import React from 'react';

const EventItem = ({ event, onRegister, onManage, onDelete, userRole }) => {
  if (!event) return null;
  const eventId = event.id || event._id;

  return (
    <div className="event-item card-border-interactive">
      <div className="event-item__info">
        <h3 className="event-item__title">{event.title}</h3>
        <p className="event-item__description">{event.description}</p>
        <p className="event-item__date">📅 {event.date}</p>
      </div>

      <div className="event-item__actions">
        {userRole !== 'organizer' && onRegister && (
          <button 
            type="button"
            className="event-item__btn-register"
            onClick={() => onRegister(eventId)}
          >
            Inscribirse 🎟️
          </button>
        )}

        {userRole === 'organizer' && onManage && (
          <button 
            type="button"
            className="event-item__btn-manage"
            onClick={() => onManage(eventId)}
          >
            Gestionar 🛠️
          </button>
        )}

        {userRole === 'organizer' && onDelete && (
          <button 
            type="button"
            className="event-item__btn-delete"
            onClick={() => onDelete(eventId)}
          >
            Eliminar 🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default EventItem;