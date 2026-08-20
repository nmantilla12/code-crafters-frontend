import React from 'react';
import EventItem from './EventItem';

const EventList = () => {
  const events = [
    { id: 1, title: 'Taller de React y BEM', date: '24 Ago 2026', status: 'Publicado' },
    { id: 2, title: 'Conferencia de Frontend', date: '30 Ago 2026', status: 'Borrador' },
    { id: 3, title: 'Meetup de JavaScript', date: '05 Sep 2026', status: 'Publicado' },
  ];

  return (
    <section className="event-list">
      <h3 className="event-list__title">Eventos Recientes</h3>
      <div className="event-list__container">
        {events.map((event) => (
          <EventItem 
            key={event.id}
            title={event.title}
            date={event.date}
            status={event.status}
          />
        ))}
      </div>
    </section>
  );
};

export default EventList;