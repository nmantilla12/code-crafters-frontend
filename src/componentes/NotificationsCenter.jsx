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
    <>
      <style>{`
        .notifications-wrapper {
          background-color: #0b0f19;
          color: #ffffff;
          padding: 3rem 1.5rem;
          width: 100%;
          min-height: 100vh;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .notifications-card {
          background: #111827;
          border: 1px solid #1f2937;
          border-radius: 16px;
          padding: 2rem;
          width: 100%;
          max-width: 650px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }

        .notifications-card:hover {
          border-color: #00f0ff;
        }

        .notifications-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #1f2937;
          padding-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .notifications-header h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.025em;
        }

        .notifications-badge {
          background: rgba(0, 240, 255, 0.1);
          color: #00f0ff;
          border: 1px solid rgba(0, 240, 255, 0.3);
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          white-space: nowrap;
        }

        .notifications-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .notifications-item {
          background: #0b0f19;
          border: 1px solid #1f2937;
          padding: 1rem 1.25rem;
          border-radius: 10px;
          font-size: 0.95rem;
          color: #cbd5e1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          box-sizing: border-box;
          transition: background-color 0.2s ease;
        }

        .notifications-item.is-read {
          opacity: 0.6;
          border-color: #161e2e;
        }

        .notifications-empty {
          text-align: center;
          color: #94a3b8;
          font-size: 1rem;
          padding: 2rem 0;
          margin: 0;
        }

        .notifications-action-btn {
          background: #00f0ff;
          color: #0b0f19;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }

        .notifications-action-btn:hover {
          background: #00adb5;
          transform: translateY(-1px);
        }

        @media (max-width: 480px) {
          .notifications-wrapper {
            padding: 1.5rem 1rem;
          }

          .notifications-card {
            padding: 1.25rem;
          }

          .notifications-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .notifications-action-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

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
    </>
  );
};

export default NotificationsCenter;