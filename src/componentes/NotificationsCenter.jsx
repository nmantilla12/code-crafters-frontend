import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsCenter = () => {
  const navigate = useNavigate();

  // Estado inicial con avisos de cambios de sala, recordatorios y flujos interactivos para roles de usuario / organizador
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'room-change', 
      title: 'Cambio de Sala y Aforo', 
      message: 'El taller de React ha cambiado al Aula 3 (Planta Baja). Verifica los recursos técnicos actualizados.', 
      date: 'Hoy, 10:30', 
      read: false,
      link: '/#discovery',
      actionLabel: 'Ver detalles de sala'
    },
    { 
      id: 2, 
      type: 'reminder', 
      title: 'Recordatorio de Entrada y QR', 
      message: 'Tu inscripción para el evento de mañana está confirmada. Ya puedes descargar tu ticket QR oficial.', 
      date: 'Ayer', 
      read: true,
      link: '/#tickets',
      actionLabel: 'Descargar Ticket QR'
    },
    { 
      id: 3, 
      type: 'organizer-update', 
      title: 'Aviso para Organizadores', 
      message: 'Se ha abierto el panel de control para la gestión de inscripciones y validación de aforo del evento.', 
      date: 'Hace 2 días', 
      read: true,
      link: '/#dashboard',
      actionLabel: 'Gestionar evento'
    }
  ]);

  // Función para marcar una notificación como leída y ejecutar el flujo interactivo correspondiente
  const handleNotificationClick = (id, link) => {
    setNotifications(
      notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );

    if (link) {
      if (link.startsWith('/#')) {
        const sectionId = link.replace('/#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/');
        }
      } else {
        navigate(link);
      }
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, read: true }))
    );
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <section 
      className="notifications-center" 
      style={{ 
        background: '#0f172a', 
        color: '#ffffff', 
        padding: '2.5rem 1.5rem', 
        borderRadius: '12px', 
        maxWidth: '750px', 
        width: '100%', 
        boxSizing: 'border-box',
        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
        border: '2px solid #334155',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: '0 auto'
      }}
    >
      {/* Cabecera optimizada con tipografía grande y contraste AAA */}
      <div 
        className="notifications-center__header" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem', 
          marginBottom: '2rem', 
          borderBottom: '2px solid #334155', 
          paddingBottom: '1.25rem',
          alignItems: 'flex-start'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 
            className="notifications-center__title" 
            style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.025em' }}
          >
            Centro de Notificaciones y Flujos
          </h3>
          
          <span 
            className="notifications-center__badge-count" 
            style={{ 
              background: '#0284c7', 
              color: '#ffffff', 
              padding: '0.35rem 0.85rem', 
              borderRadius: '999px', 
              fontSize: '0.9rem', 
              fontWeight: '700' 
            }}
          >
            {notifications.filter(n => !n.read).length} sin leer
          </span>
        </div>

        {hasUnread && (
          <button 
            type="button" 
            className="notifications-center__btn-all"
            onClick={handleMarkAllAsRead}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#38bdf8', 
              cursor: 'pointer', 
              fontSize: '0.95rem', 
              fontWeight: '700', 
              textDecoration: 'underline',
              padding: 0
            }}
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="notifications-center__empty" style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '1.05rem', padding: '2rem 0' }}>
          No tienes notificaciones recientes.
        </p>
      ) : (
        <ul className="notifications-center__list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {notifications.map((notif) => (
            <li 
              key={notif.id} 
              className="notifications-center__item"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem', 
                padding: '1.5rem', 
                borderRadius: '10px', 
                background: notif.read ? '#1e293b' : '#0f2942', 
                border: '2px solid',
                borderColor: notif.read ? '#334155' : '#0284c7',
                boxSizing: 'border-box',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', width: '100%' }}>
                <div className="notifications-center__icon-wrapper" style={{ fontSize: '1.5rem', flexShrink: 0 }} aria-hidden="true">
                  🔔
                </div>
                
                <div className="notifications-center__content" style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <h4 
                      className="notifications-center__item-title" 
                      style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc' }}
                    >
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span style={{ fontSize: '0.8rem', background: '#0284c7', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: '700', flexShrink: 0 }}>
                        Nuevo
                      </span>
                    )}
                  </div>
                  <p className="notifications-center__text" style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#cbd5e1', lineHeight: '1.5', fontWeight: '400' }}>
                    {notif.message}
                  </p>
                  <span className="notifications-center__date" style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>
                    {notif.date}
                  </span>
                </div>
              </div>

              {/* Botón interactivo dinámico adaptado a cada flujo de usuario/organizador */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => handleNotificationClick(notif.id, notif.link)}
                  style={{
                    background: '#38bdf8',
                    color: '#0f172a',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '6px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '260px',
                    textAlign: 'center'
                  }}
                >
                  {notif.actionLabel || 'Ver acción'} &rarr;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default NotificationsCenter;