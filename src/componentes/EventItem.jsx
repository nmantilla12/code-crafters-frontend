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
      {/* Estilos CSS inyectados para garantizar diseño responsive, contraste AAA, legibilidad y accesibilidad total */}
      <style>{`
        .event-item {
          background: #1e293b;
          color: #ffffff;
          padding: 1.5rem;
          border-radius: 12px;
          border: 2px solid #334155;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-sizing: border-box;
          width: 100%;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .event-item:hover {
          border-color: #0284c7;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }

        .event-item__header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .event-item__icon {
          font-size: 2.25rem;
          background: #0f172a;
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .event-item__text-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-grow: 1;
        }

        .event-item__title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.02em;
        }

        .event-item__description {
          margin: 0;
          font-size: 0.95rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .event-item__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.95rem;
          color: #cbd5e1;
          font-weight: 600;
          align-items: center;
          margin-top: 0.25rem;
        }

        .event-item__badge {
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          text-transform: capitalize;
        }

        .event-item__badge--published {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
        }

        .event-item__badge--draft {
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.4);
        }

        .event-item__actions {
          display: flex;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #334155;
        }

        .event-item__btn-manage {
          flex-grow: 1;
          background: #0284c7;
          color: #ffffff;
          border: none;
          padding: 0.65rem 1rem;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .event-item__btn-manage:hover {
          background: #0369a1;
        }

        .event-item__btn-delete {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.4);
          padding: 0.65rem 1rem;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .event-item__btn-delete:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        @media (max-width: 480px) {
          .event-item {
            padding: 1.25rem;
          }
          .event-item__meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
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
            🗑 Eliminar
          </button>
        </div>
      </article>
    </>
  );
};

export default EventItem;