import React from 'react';
import '../styles/eventitem.scss';

const EventItem = ({ event, onAddToCart, onManage, onDelete, userRole }) => {
  if (!event) return null;
  const eventId = String(event.id || event._id || '');

  const isSpectator = userRole === 'spectator' || Boolean(onAddToCart);

  // 🛡️ Mapeo actualizado con tus nuevas imágenes favoritas
  const getImageById = (id) => {
    switch (id) {
      case '1':
        return '/images/tungnguy-technology.jpg';
      case '2':
        return '/images/developer-word.jpg';
      case '3':
        return '/images/code-laptop.jpg';
      case '4':
        return '/images/team-collaboration.jpg';
      default:
        const numericId = parseInt(id, 10);
        if (!isNaN(numericId)) {
          const images = [
            '/images/tungnguy-technology.jpg',
            '/images/developer-word.jpg',
            '/images/code-laptop.jpg',
            '/images/team-collaboration.jpg'
          ];
          return images[numericId % images.length];
        }
        return '/images/tungnguy-technology.jpg';
    }
  };

  const eventImage = getImageById(eventId);

  return (
    <div className="event-item card-border-interactive">
      
      <div className="event-item__image-container">
        <img 
          src={eventImage} 
          alt={event.title || 'Evento'} 
          className="event-item__image" 
          onError={(e) => {
            e.target.src = '/images/tungnguy-technology.jpg';
          }}
        />
      </div>

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

      <div className="event-item__actions">
        {isSpectator ? (
          <button 
            type="button"
            className="spectator-btn spectator-btn--primary"
            onClick={() => {
              if (onAddToCart) {
                onAddToCart(event);
              }
            }}
          >
            Añadir al Carrito 🛒
          </button>
        ) : (
          <>
            <button 
              type="button"
              className="event-item__btn event-item__btn-manage"
              onClick={() => {
                if (onManage) {
                  onManage(event.id || event._id);
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
                  onDelete(event.id || event._id);
                }
              }}
            >
              Eliminar 🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventItem;