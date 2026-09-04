import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const TicketQR = ({ eventTitle, eventDate, ticketId, eventId, currentUserEmail, onRegisterSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    let emailToUse = currentUserEmail;
    
    if (!emailToUse) {
      emailToUse = prompt("Introduce tu correo electrónico para el registro:", "asistente@codecrafters.com");
      if (!emailToUse) return;
    }

    setLoading(true);

    setTimeout(() => {
      setIsRegistered(true);
      setLoading(false);
      alert("¡Inscripción completada con éxito! Ya puedes ver y descargar tu entrada.");
      if (onRegisterSuccess) onRegisterSuccess();
    }, 600);
  };

  const handleShareWhatsApp = () => {
    const ticketDetails = `¡Hola! 🎟️ Te comparto mi entrada oficial:\n\n📌 *${eventTitle}*\n📅 Fecha: ${eventDate}\n🆔 ID de Ticket: ${ticketId}\n\n¡Nos vemos en el evento!`;
    const message = encodeURIComponent(ticketDetails);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const handleShareGeneral = async () => {
    try {
      await navigator.clipboard.writeText(`Entrada: ${eventTitle} - ID: ${ticketId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `========================================\n` +
      ` ENTRADA OFICIAL - CODE CRAFTERS\n` +
      `========================================\n` +
      `Evento: ${eventTitle}\n` +
      `Fecha: ${eventDate}\n` +
      `ID de Ticket: ${ticketId}\n` +
      `Estado: Confirmado\n` +
      `========================================`
    ], { type: 'text/plain;charset=utf-8' });
    
    element.href = URL.createObjectURL(file);
    element.download = `Entrada_${eventTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <div className="ticket-qr">
      <h3 className="ticket-qr__title">{eventTitle}</h3>
      <p className="ticket-qr__subtitle">📅 {eventDate}</p>

      {!isRegistered ? (
        <div>
          <p className="ticket-qr__subtitle" style={{ fontSize: '1rem' }}>
            Debes registrarte para desbloquear tu código QR y tu entrada accesible.
          </p>
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="ticket-qr__btn-download"
          >
            {loading ? 'Procesando...' : 'Registrarse en el evento'}
          </button>
        </div>
      ) : (
        <div>
          <div className="ticket-qr__code-container">
            <QRCodeSVG value={ticketId} fgColor="#0b1120" bgColor="#ffffff" className="ticket-qr__image" />
          </div>
          
          <div className="ticket-qr__details">
            <p>ID Ticket: <strong style={{ fontFamily: 'monospace' }}>{ticketId}</strong></p>
          </div>

          {/* Contenedor de acciones ordenado verticalmente para móvil y responsivo */}
          <div className="ticket-qr__actions">
            <button 
              type="button" 
              onClick={handleDownload}
              className="ticket-qr__btn-download"
            >
              📥 Descargar Entrada
            </button>
            <button 
              type="button" 
              onClick={handleShareWhatsApp}
              className="ticket-qr__btn-whatsapp"
            >
              💬 Compartir por WhatsApp
            </button>
            <button 
              type="button" 
              onClick={handleShareGeneral}
              className="ticket-qr__btn-share"
            >
              {copied ? '¡Copiado al portapapeles!' : '🔗 Copiar Enlace'}
            </button>
          </div>

          <div>
            <span className="ticket-qr__badge">
              ✓ Confirmado y Registrado
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketQR;