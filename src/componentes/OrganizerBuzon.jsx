// src/components/OrganizerBuzon.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/organizerbuzon.scss';

const OrganizerBuzon = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  
  // Estado para controlar qué tarjeta específica muestra el mensaje de éxito actual
  const [successCardId, setSuccessCardId] = useState(null);

  useEffect(() => {
    const savedComplaints = localStorage.getItem('codeCraftersComplaints');
    if (savedComplaints) {
      try {
        setComplaints(JSON.parse(savedComplaints));
      } catch (e) {
        setComplaints([]);
      }
    } else {
      // 4 mensajes iniciales simulados para que el organizador gestione
      const initialComplaints = [
        { id: 1, user: 'Espectador Anónimo', email: 'soporte@codecrafters.com', message: 'Me gustaría que hubiera más talleres prácticos de Backend y microservicios.', date: '2026-09-10' },
        { id: 2, user: 'Laura Gómez', email: 'laura.gomez@example.com', message: 'El proceso de inscripción fue muy rápido y claro. ¡Felicitaciones al equipo!', date: '2026-09-11' },
        { id: 3, user: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', message: '¿Se van a compartir las grabaciones de las ponencias de inteligencia artificial?', date: '2026-09-12' },
        { id: 4, user: 'Sofía Martínez', email: 'sofia.mtz@example.com', message: 'Tuve un pequeño problema con el acceso al taller de React, por lo demás excelente evento.', date: '2026-09-13' }
      ];
      setComplaints(initialComplaints);
      localStorage.setItem('codeCraftersComplaints', JSON.stringify(initialComplaints));
    }
  }, []);

  // Función para activar el mensaje de éxito en la tarjeta seleccionada (al pulsar en una, se oculta la de las demás automáticamente)
  const handleReplyClick = (id) => {
    setSuccessCardId(id);
  };

  // Función para eliminar un mensaje del buzón
  const handleDelete = (id) => {
    if (successCardId === id) {
      setSuccessCardId(null);
    }
    const updated = complaints.filter(item => item.id !== id);
    setComplaints(updated);
    localStorage.setItem('codeCraftersComplaints', JSON.stringify(updated));
  };

  return (
    <div className="organizer-buzon-container">
      <main className="organizer-buzon__main-content">
        
        {/* Cabecera centrada, elegante, título cian */}
        <header className="buzon-header">
          <h1 className="buzon-title">Buzón de Quejas o Sugerencias</h1>
          <p className="buzon-subtitle">
            Revisa, responde y gestiona los comentarios enviados por los asistentes para optimizar las próximas ediciones.
          </p>
        </header>

        <div className="buzon-content">
          {complaints.length === 0 ? (
            <div className="organizer-buzon__empty">
              <p>No hay quejas o sugerencias registradas en este momento.</p>
            </div>
          ) : (
            <div className="buzon-list">
              {complaints.map((item) => {
                // Preparamos la URL web de Gmail apuntando a tu correo oficial y rellenando los datos
                const recipientEmail = "nnnmantillam@gmail.com";
                const emailSubject = encodeURIComponent(`Respuesta a tu sugerencia en CodeCrafters (${item.user})`);
                const emailBody = encodeURIComponent(`Hola ${item.user},\n\nEn relación a tu comentario: "${item.message}"...\n\nAtentamente,\nEquipo CodeCrafters`);
                const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${emailSubject}&body=${emailBody}`;

                return (
                  <article key={item.id} className="buzon-card">
                    <div className="buzon-card__meta">
                      <span className="buzon-card__author">👤 {item.user}</span>
                      <span className="buzon-card__date">📅 {item.date}</span>
                    </div>
                    <p className="buzon-card__message">"{item.message}"</p>
                    
                    {/* Acciones de Organizador: Responder por Gmail web y Eliminar */}
                    <div className="buzon-card__actions">
                      <a 
                        href={gmailWebUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleReplyClick(item.id)}
                        className="buzon-btn-reply"
                      >
                        ✉️ Responder por Correo
                      </a>
                      <button 
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="buzon-btn-delete"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>

                    {/* Mensaje de éxito que aparece exclusivamente en la tarjeta activa y desaparece al responder otra */}
                    {successCardId === item.id && (
                      <div className="buzon-success-alert">
                        ✨ <strong>¡Borrador generado con éxito!</strong> Se ha abierto Gmail en una pestaña nueva con tu respuesta hacia <strong>nnnmantillam@gmail.com</strong>. Puedes seguir revisando y gestionando más quejas libremente.
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* Botón grande y estilizado para volver al panel */}
          <div className="buzon-footer-actions">
            <button
              type="button"
              onClick={() => navigate('/organizer/dashboard')}
              className="buzon-back-btn"
            >
              ← Volver al Panel Organizador
            </button>
          </div>
        </div>

      </main>

      {/* Footer perfectamente centrado abajo */}
      <footer className="buzon-footer">
        <p>© 2026 CodeCrafters Events. Todos los derechos reservados. — Panel de Gestión de Organizadores</p>
      </footer>
    </div>
  );
};

export default OrganizerBuzon;