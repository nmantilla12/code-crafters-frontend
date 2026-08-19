import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TicketQR from './TicketQR';

const EventItem = ({ title, date, status }) => {
  const [registeredTicket, setRegisteredTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulamos una llamada al servidor con promesa y buenas prácticas de linting (new Error)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Cambia a true si quieres simular que el evento está lleno para pruebas
          const isFull = false; 
          if (isFull) {
            reject(new Error("Lo sentimos, el evento ya está lleno."));
          } else {
            resolve();
          }
        }, 1200);
      });

      // 1. Generamos un ID único para el ticket
      const newTicketId = uuidv4();

      // 2. Creamos el objeto del ticket
      const ticketData = {
        id: newTicketId,
        eventTitle: title,
        eventDate: date,
        dateRegistered: new Date().toLocaleDateString()
      };

      // 3. Recuperamos los tickets anteriores de localStorage (o un array vacío)
      const existingTickets = JSON.parse(localStorage.getItem('myTickets')) || [];

      // 4. Añadimos el nuevo ticket y lo guardamos
      const updatedTickets = [...existingTickets, ticketData];
      localStorage.setItem('myTickets', JSON.stringify(updatedTickets));

      // 5. Actualizamos el estado local para mostrar el QR al instante
      setRegisteredTicket(ticketData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-item">
      <div className="event-item__info">
        <h4 className="event-item__name">{title}</h4>
        <p className="event-item__date">{date}</p>
        <span className={`event-item__status event-item__status--${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      {/* Mensaje de error si la inscripción falla */}
      {error && <p className="event-item__error">{error}</p>}

      {/* Si ya está inscrito, mostramos el ticket QR; si no, el botón de inscripción */}
      {registeredTicket ? (
        <div className="event-item__ticket-container">
          <p className="event-item__success-msg">¡Inscripción exitosa!</p>
          <TicketQR 
            eventTitle={registeredTicket.eventTitle} 
            eventDate={registeredTicket.eventDate} 
            ticketId={registeredTicket.id} 
          />
        </div>
      ) : (
        <button 
          type="button" 
          className="event-item__register-btn" 
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Inscribirme'}
        </button>
      )}
    </div>
  );
};

export default EventItem;
