import React from 'react';

const EventItem = ({ event, onRegister, onManage }) => {
  if (!event) return null;

  return (
    <div className="event-item card-border-interactive">
      <div className="event-item__info">
        <h3 className="event-item__title">{event.title}</h3>
        <p className="event-item__description">{event.description}</p>
        <p className="event-item__date">📅 {event.date}</p>
      </div>

      <div className="event-item__actions">
        {onRegister && (
          <button 
            className="event-item__btn-register"
            onClick={() => onRegister(event.id)}
          >
            Inscribirme
          </button>
        )}
        {onManage && (
          <button 
            className="event-item__btn-manage"
            onClick={() => onManage(event.id)}
          >
            Gestionar
          </button>
        )}
      </div>
    </div>
  );
};

export default EventItem;