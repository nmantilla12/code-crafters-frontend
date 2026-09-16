// src/componentes/NotificationsCenter.jsx
import React, { useState } from 'react';

const NotificationsCenter = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nuevo evento de arquitectura disponible.', type: 'info', read: false },
    { id: 2, text: 'Tu entrada ha sido validada correctamente.', type: 'success', read: false }
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="notifications-wrapper">
      <div className="notifications-card card-border-interactive">
        <div className="notifications-header">
          <h3>Centro de Notificaciones</h3>
          <span className="notifications-badge">
            {notifications.filter(n => !n.read).length} nuevas
          </span>
        </div>

        <ul className="notifications-list">
          {notifications.length === 0 ? (
            <li className="notifications-empty">No hay notificaciones pendientes.</li>
          ) : (
            notifications.map((notif) => (
              <li 
                key={notif.id} 
                className={`notifications-item ${notif.read ? 'is-read' : 'is-unread'}`}
              >
                <span>{notif.text}</span>
                {!notif.read && (
                  <button 
                    type="button" 
                    className="notifications-action-btn"
                    onClick={() => markAsRead(notif.id)}
                  >
                    Marcar leída
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsCenter;