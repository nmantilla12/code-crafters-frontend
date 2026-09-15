// src/componentes/EventItem.jsx
import React from 'react';

const EventItem = ({ event, onRegister, onManage, onDelete, userRole }) => {
  if (!event) return null;
  const eventId = event.id || event._id;

  return (
    <div className="event-item card-border-interactive">
      
      {/* Cabecera del título del evento */}
      <div className="event-item__header">
        <h3 className="event-item__title">
          {event.title}
        </h3>
      </div>

      <div className="event-item__info">
        <p className="event-item__description">
          {event.description}
        </p>
        <p className="event-item__date">
          📅 {event.date}
        </p>
      </div>

      {/* Botones de acción unificados */}
      <div className="event-item__actions">
        <button 
          type="button"
          className="event-item__btn event-item__btn-manage"
          onClick={() => {
            if (onManage) {
              onManage(eventId);
            }
          }}
        >
          Gestionar 🛠️
        </button>

        <button 
          type="button"
          className="event-item__btn event-item__btn-delete"
          onClick={() => {
            if (onDelete) {
              onDelete(eventId);
            }
          }}
        >
          Eliminar 🗑️
        </button>
      </div>
    </div>
  );
};

export default EventItem;