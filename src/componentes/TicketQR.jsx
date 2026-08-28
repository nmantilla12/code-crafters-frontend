import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const TicketQR = ({ eventTitle, eventDate, ticketId, eventId, currentUserEmail, onRegisterSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Registro único en el evento
  const handleRegister = async () => {
    if (!currentUserEmail) {
      alert("Por favor, introduce tu correo electrónico para registrarte.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/events/${eventId}`);
      const event = await res.json();

      const registeredList = event.registeredUsers || [];
      
      // Comprobar si ya está registrado (unicidad)
      if (registeredList.includes(currentUserEmail)) {
        setIsRegistered(true);
        alert("Ya estás registrado en este evento.");
        setLoading(false);
        return;
      }

      const updatedUsers = [...registeredList, currentUserEmail];

      const updateRes = await fetch(`http://localhost:4000/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registeredUsers: updatedUsers })
      });

      if (!updateRes.ok) throw new Error("Error en la inscripción");

      setIsRegistered(true);
      alert("¡Inscripción completada con éxito! Ya puedes ver y descargar tu entrada.");
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      console.error("Error al registrarse:", err);
      alert("Hubo un error al procesar el registro.");
    } finally {
      setLoading(false);
    }
  };

  // Funcionalidad de WhatsApp con el mensaje formateado
  const handleShareWhatsApp = () => {
    const ticketDetails = `¡Hola! 🎟️ Te comparto mi entrada oficial:\n\n📌 *${eventTitle}*\n📅 Fecha: ${eventDate}\n🆔 ID de Ticket: ${ticketId}\n\n¡Nos vemos en el evento!`;
    const message = encodeURIComponent(ticketDetails);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  // Funcionalidad general para compartir
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

  // Descarga real de la entrada simulando un archivo de texto/PDF o blob
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
    document.body.removeChild(element);
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
        maxWidth: '450px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        border: '2px solid #cbd5e1',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box'
      }}
    >
      <div className="ticket-qr__header" style={{ width: '100%', marginBottom: '1.25rem' }}>
        <h3 className="ticket-qr__title" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
          {eventTitle}
        </h3>
        <p className="ticket-qr__date" style={{ color: '#1e293b', fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>
          📅 {eventDate}
        </p>
      </div>

      {!isRegistered ? (
        <div style={{ width: '100%', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.95rem', color: '#334155', fontWeight: '600' }}>
            Debes registrarte para desbloquear tu código QR y descargar tu entrada.
          </p>
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            style={{
              backgroundColor: '#0369a1',
              color: '#ffffff',
              fontWeight: '700',
              padding: '0.85rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              width: '100%',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Procesando...' : 'Registrarse en el evento'}
          </button>
        </div>
      ) : (
        <>
          <div className="ticket-qr__body" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="ticket-qr__code-container" style={{ background: '#fff', padding: '1rem', border: '2px solid #cbd5e1', borderRadius: '8px', marginBottom: '0.75rem', display: 'inline-block' }}>
              <QRCodeSVG value={ticketId} size={160} />
            </div>
            <p className="ticket-qr__id" style={{ color: '#0369a1', fontSize: '0.9rem', fontWeight: '700', wordBreak: 'break-all', marginBottom: '1.25rem' }}>
              ID Ticket: <span>{ticketId}</span>
            </p>
          </div>

          <div 
            className="ticket-qr__actions" 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px', 
              marginBottom: '1.25rem',
              justifyContent: 'center',
              width: '100%' 
            }}
          >
            <button 
              type="button" 
              className="ticket-qr__btn ticket-qr__btn--download" 
              onClick={handleDownload}
              style={{ flex: '1 1 110px', padding: '0.75rem', fontSize: '0.95rem', fontWeight: '700', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Descargar
            </button>
            <button 
              type="button" 
              className="ticket-qr__btn ticket-qr__btn--whatsapp" 
              onClick={handleShareWhatsApp}
              style={{ flex: '1 1 110px', padding: '0.75rem', fontSize: '0.95rem', fontWeight: '700', backgroundColor: '#15803d', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              WhatsApp
            </button>
            <button 
              type="button" 
              className="ticket-qr__btn ticket-qr__btn--share" 
              onClick={handleShareGeneral}
              style={{ flex: '1 1 110px', padding: '0.75rem', fontSize: '0.95rem', fontWeight: '700', backgroundColor: '#475569', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              {copied ? '¡Copiado!' : 'Compartir'}
            </button>
          </div>

          <div className="ticket-qr__footer">
            <span 
              className="ticket-qr__badge"
              style={{ 
                background: '#14532d', 
                color: '#f0fdf4', 
                padding: '0.35rem 1rem', 
                borderRadius: '9999px', 
                fontSize: '0.9rem', 
                fontWeight: '700',
                display: 'inline-block',
                border: '1px solid #86efac'
              }}
            >
              ✓ Confirmado y Registrado
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketQR;