// src/componentes/EventItem.jsx
import React from 'react';

const EventItem = ({ event, onAddToCart, onManage, onDelete, userRole }) => {
  if (!event) return null;
  const eventId = event.id || event._id;

  // Determinamos si estamos en modo espectador
  const isSpectator = userRole === 'spectator' || Boolean(onAddToCart);

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

      {/* Botones de acción dinámicos según el rol */}
      <div className="event-item__actions">
        {isSpectator ? (
          /* Si es espectador: Solo ve el botón de añadir al carrito */
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
          /* Si es organizador: Ve los botones de gestión y eliminación */
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default EventItem;