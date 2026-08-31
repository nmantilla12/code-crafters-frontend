// src/componentes/EventItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventItem = ({ id, title, description, date, attendees, status = 'Borrador', icon, onDelete }) => {
  const navigate = useNavigate();
  
  // Verificamos el estado usando minúsculas y normalización para evitar errores de tipo
  const normalizedStatus = status?.toLowerCase() || 'borrador';
  const isPublished = normalizedStatus === 'publicado' || normalizedStatus === 'published';
  const statusClass = isPublished ? 'published' : 'draft';

  const handleManage = () => {
    // Navegación dinámica pasando el ID del evento para gestionarlo individualmente
    navigate(`/organizer/manage-event/${id}`);
  };

  const handleDelete = () => {
    if (onDelete && id) {
      if (window.confirm(`¿Estás segura de que deseas eliminar el evento "${title}"?`)) {
        onDelete(id);
      }
    }
  };

  return (
    <>
      <style>{`
        .event-item {
          background: #111827;
          color: #ffffff;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #1f2937;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-sizing: border-box;
          width: 100%;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }

        .event-item:hover {
          border-color: #00f0ff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }

        .event-item__header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }

        .event-item__icon {
          font-size: 2rem;
          background: #0b0f19;
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid #1f2937;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-sizing: border-box;
        }

        .event-item__text-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-grow: 1;
          min-width: 0;
        }

        .event-item__title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.02em;
          word-break: break-word;
        }

        .event-item__description {
          margin: 0;
          font-size: 0.95rem;
          color: #94a3b8;
          line-height: 1.5;
          word-break: break-word;
        }

        .event-item__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1rem;
          font-size: 0.85rem;
          color: #cbd5e1;
          font-weight: 600;
          align-items: center;
          margin-top: 0.25rem;
        }

        .event-item__badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          text-transform: capitalize;
          white-space: nowrap;
        }

        .event-item__badge--published {
          background: rgba(0, 240, 255, 0.1);
          color: #00f0ff;
          border: 1px solid rgba(0, 240, 255, 0.3);
        }

        /* Tono azulado/grisáceo elegante para borradores, sin amarillos chillones */
        .event-item__badge--draft {
          background: rgba(148, 163, 184, 0.15);
          color: #cbd5e1;
          border: 1px solid rgba(148, 163, 184, 0.3);
        }

        .event-item__actions {
          display: flex;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #1f2937;
          flex-wrap: wrap;
          width: 100%;
          box-sizing: border-box;
        }

        .event-item__btn-manage {
          flex-grow: 1;
          min-width: 120px;
          background: #00f0ff;
          color: #0b0f19;
          border: none;
          padding: 0.65rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          text-align: center;
        }

        .event-item__btn-manage:hover {
          background: #00adb5;
          transform: translateY(-1px);
        }

        .event-item__btn-delete {
          background: #1f2937;
          color: #94a3b8;
          border: 1px solid #374151;
          padding: 0.65rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          text-align: center;
        }

        .event-item__btn-delete:hover {
          background: #374151;
          color: #ffffff;
          border-color: #4b5563;
        }

        /* Responsive optimizado para dispositivos móviles */
        @media (max-width: 480px) {
          .event-item {
            padding: 1.25rem;
          }

          .event-item__header {
            flex-direction: column;
            align-items: flex-start;
          }

          .event-item__icon {
            font-size: 1.5rem;
            padding: 0.5rem;
          }

          .event-item__actions {
            flex-direction: column;
          }

          .event-item__btn-manage,
          .event-item__btn-delete {
            width: 100%;
          }
        }
      `}</style>

      <article className="event-item">
        <div className="event-item__header">
          <span className="event-item__icon" aria-hidden="true">{icon || '📅'}</span>
          <div className="event-item__text-group">
            <h4 className="event-item__title">{title}</h4>
            {description && <p className="event-item__description">{description}</p>}
            
            <div className="event-item__meta">
              <span>📅 {date}</span>
              <span>👥 {attendees ?? 0} asistentes</span>
              <span className={`event-item__badge event-item__badge--${statusClass}`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        <div className="event-item__actions">
          <button 
            type="button" 
            className="event-item__btn-manage" 
            onClick={handleManage}
            title={`Gestionar evento: ${title}`}
          >
            Gestionar Evento
          </button>
          <button 
            type="button" 
            className="event-item__btn-delete" 
            onClick={handleDelete}
            title="Eliminar evento permanentemente"
          >
            Eliminar
          </button>
        </div>
      </article>
    </>
  );
};

export default EventItem;