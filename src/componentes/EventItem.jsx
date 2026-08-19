import React from 'react';

const EventItem = ({ title, date, status }) => {
  // Evaluamos si está publicado para asignar la clase BEM modificadora correspondiente
  const isPublished = status === 'Publicado';
  const statusModifier = isPublished ? 'published' : 'draft';

  return (
    <article className="event-item">
      <div className="event-item__info">
        <h4 className="event-item__title">{title}</h4>
        <span className="event-item__date">{date}</span>
      </div>
      <span className={`event-item__status event-item__status--${statusModifier}`}>
        {status}
      </span>
    </article>
  );
};

export default EventItem;