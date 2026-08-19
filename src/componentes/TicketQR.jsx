import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const TicketQR = ({ eventTitle, eventDate, ticketId }) => {
  const [copied, setCopied] = useState(false);

  // Funcionalidad de WhatsApp con el mensaje formateado profesionalmente
  const handleShareWhatsApp = () => {
    const ticketDetails = `¡Hola! 🎟️ Te comparto mi entrada oficial:\n\n📌 *${eventTitle}*\n📅 Fecha: ${eventDate}\n🆔 ID de Ticket: ${ticketId}\n\n¡Nos vemos en el evento!`;
    const message = encodeURIComponent(ticketDetails);
    
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  // Funcionalidad general para compartir (API nativa o portapapeles)
  const handleShareGeneral = async () => {
    const shareData = {
      title: 'Mi Entrada - Evento',
      text: `¡Voy a asistir a ${eventTitle} el ${eventDate}! Mi ID de entrada es ${ticketId}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`Entrada: ${eventTitle} - ID: ${ticketId}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error("Error al compartir:", err);
    }
  };

  // Funcionalidad simulada para descargar el ticket
  const handleDownload = () => {
    alert(`Descargando ticket para: ${eventTitle} (ID: ${ticketId})`);
  };

  return (
    <div className="ticket-qr">
      <div className="ticket-qr__header">
        <h3 className="ticket-qr__title">{eventTitle}</h3>
        <p className="ticket-qr__date">{eventDate}</p>
      </div>
      
      <div className="ticket-qr__body">
        {/* Código QR visual en pantalla */}
        <div className="ticket-qr__code-container">
          <QRCodeSVG value={ticketId} size={150} />
        </div>
        <p className="ticket-qr__id">ID Ticket: <span>{ticketId}</span></p>
      </div>

      {/* Acciones interactivas: Descargar, WhatsApp y Compartir */}
      <div className="ticket-qr__actions" style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'center' }}>
        <button 
          type="button" 
          className="ticket-qr__btn ticket-qr__btn--download" 
          onClick={handleDownload}
        >
          Descargar
        </button>
        <button 
          type="button" 
          className="ticket-qr__btn ticket-qr__btn--whatsapp" 
          onClick={handleShareWhatsApp}
        >
          WhatsApp
        </button>
        <button 
          type="button" 
          className="ticket-qr__btn ticket-qr__btn--share" 
          onClick={handleShareGeneral}
        >
          {copied ? '¡Copiado!' : 'Compartir'}
        </button>
      </div>

      <div className="ticket-qr__footer">
        <span className="ticket-qr__badge">Confirmado</span>
      </div>
    </div>
  );
};

export default TicketQR;