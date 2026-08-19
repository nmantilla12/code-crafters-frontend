import React, { useState } from 'react';

const NotificationsCenter = () => {
  // Estado inicial con avisos de cambios de sala y recordatorios
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'room-change', 
      title: 'Cambio de Sala', 
      message: 'El taller de React ha cambiado al Aula 3 (Planta Baja).', 
      date: 'Hoy, 10:30', 
      read: false 
    },
    { 
      id: 2, 
      type: 'reminder', 
      title: 'Recordatorio de Evento', 
      message: 'Tu inscripción para mañana está confirmada. ¡No olvides tu ticket QR!', 
      date: 'Ayer', 
      read: true 
    },
    { 
      id: 3, 
      type: 'update', 
      title: 'Actualización de Horario', 
      message: 'Se han abierto las puertas 15 minutos antes del inicio.', 
      date: 'Hace 2 días', 
      read: true 
    }
  ]);

  // Función para marcar una notificación como leída individualmente
  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Función para marcar todas las notificaciones como leídas
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, read: true }))
    );
  };

  // Comprobamos si hay alguna notificación pendiente de leer
  const hasUnread = notifications.some(n => !n.read);

  return (
    <section className="notifications-center">
      <div className="notifications-center__header">
        <h3 className="notifications-center__title">Centro de Notificaciones</h3>
        
        <div className="notifications-center__actions">
          <span className="notifications-center__badge-count">
            {notifications.filter(n => !n.read).length} sin leer
          </span>
          
          {hasUnread && (
            <button 
              type="button" 
              className="notifications-center__btn-all"
              onClick={handleMarkAllAsRead}
            >
              Marcar todas como leídas
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <p className="notifications-center__empty">No tienes notificaciones recientes.</p>
      ) : (
        <ul className="notifications-center__list">
          {notifications.map((notif) => (
            <li 
              key={notif.id} 
              className={`notifications-center__item ${notif.read ? '' : 'notifications-center__item--unread'}`}
            >
              <div className="notifications-center__icon-wrapper">
                <span className="notifications-center__icon" role="img" aria-label="Aviso">🔔</span>
              </div>
              
              <div className="notifications-center__content">
                <h4 className="notifications-center__item-title">{notif.title}</h4>
                <p className="notifications-center__text">{notif.message}</p>
                <span className="notifications-center__date">{notif.date}</span>
              </div>

              {!notif.read && (
                <button 
                  type="button" 
                  className="notifications-center__btn-action"
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  Marcar leída
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default NotificationsCenter;