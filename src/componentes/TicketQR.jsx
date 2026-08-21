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
    <div 
      className="ticket-qr"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      <div className="ticket-qr__header">
        <h3 className="ticket-qr__title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
          {eventTitle}
        </h3>
        <p className="ticket-qr__date" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {eventDate}
        </p>
      </div>
      
      <div className="ticket-qr__body" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Código QR visual en pantalla */}
        <div className="ticket-qr__code-container" style={{ background: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', display: 'inline-block' }}>
          <QRCodeSVG value={ticketId} size={150} />
        </div>
        <p className="ticket-qr__id" style={{ color: '#38bdf8', fontSize: '0.75rem', wordBreak: 'break-all', marginBottom: '1rem' }}>
          ID Ticket: <span>{ticketId}</span>
        </p>
      </div>

      {/* Acciones interactivas: Responsive con flex-wrap para evitar que se amontonen */}
      <div 
        className="ticket-qr__actions" 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px', 
          marginTop: '4px', 
          marginBottom: '1rem',
          justifyContent: 'center',
          width: '100%' 
        }}
      >
        <button 
          type="button" 
          className="ticket-qr__btn ticket-qr__btn--download" 
          onClick={handleDownload}
          style={{ flex: '1 1 90px', padding: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          Descargar
        </button>
        <button 
          type="button" 
          className="ticket-qr__btn ticket-qr__btn--whatsapp" 
          onClick={handleShareWhatsApp}
          style={{ flex: '1 1 90px', padding: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          WhatsApp
        </button>
        <button 
          type="button" 
          className="ticket-qr__btn ticket-qr__btn--share" 
          onClick={handleShareGeneral}
          style={{ flex: '1 1 90px', padding: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          {copied ? '¡Copiado!' : 'Compartir'}
        </button>
      </div>

      <div className="ticket-qr__footer">
        <span 
          className="ticket-qr__badge"
          style={{ 
            background: '#065f46', 
            color: '#ecfdf5', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '9999px', 
            fontSize: '0.75rem', 
            fontWeight: 'bold',
            display: 'inline-block' 
          }}
        >
          Confirmado
        </span>
      </div>
    </div>
  );
};

export default TicketQR;