import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventItem = ({ id, title, date, attendees, status, icon, onDelete }) => {
  const navigate = useNavigate();
  const statusClass = status.toLowerCase() === 'publicado' ? 'published' : 'draft';

  const handleManage = () => {
    navigate('/organizer/manage-event');
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="event-item">
      <div className="event-item__info">
        <span className="event-item__icon" aria-hidden="true">{icon || '📅'}</span>
        <div>
          <h4 className="event-item__name">{title}</h4>
          <p className="event-item__details">
            📅 {date} &nbsp;&nbsp; 👥 {attendees} &nbsp;&nbsp; 
            <span className={`event-item__badge event-item__badge--${statusClass}`}>
              {status}
            </span>
          </p>
        </div>
      </div>

      <div className="event-item__actions">
        <button 
          type="button" 
          className="event-item__btn-manage" 
          onClick={handleManage}
        >
          Gestionar
        </button>
        <button 
          type="button" 
          className="event-item__btn-delete" 
          onClick={handleDelete}
          title="Eliminar evento"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default EventItem;