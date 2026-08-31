// src/componentes/TicketQR.jsx
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

    // Simulación local 100% frontend sin errores de red (servidor backend eliminado)
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
    <>
      <style>{`
        .ticket-qr-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 450px;
          margin: 1.5rem auto;
          padding: 1.75rem 1.25rem;
          background-color: #0b1120;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 16px;
          box-sizing: border-box;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .ticket-qr-card:hover,
        .ticket-qr-card:focus-within {
          border: 1px solid #0284c7 !important;
        }

        .ticket-qr-inner {
          background: #0b1120;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 12px;
          padding: 1.5rem 1rem;
          width: 100%;
          box-sizing: border-box;
          margin-top: 1rem;
          transition: border-color 0.2s ease;
        }

        .ticket-qr-card:hover .ticket-qr-inner,
        .ticket-qr-card:focus-within .ticket-qr-inner {
          border: 1px solid #0284c7 !important;
        }

        /* Contenedor estricto para evitar deformación del QR */
        .qr-code-wrapper {
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem;
          border-radius: 12px;
          margin: 0 auto 1rem auto;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 160px;
          height: 160px;
          box-sizing: border-box;
        }

        .qr-code-wrapper svg {
          width: 100% !important;
          height: 100% !important;
          max-width: 130px;
          max-height: 130px;
        }

        .ticket-id-container {
          color: #38bdf8;
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0 0 1.25rem 0;
          width: 100%;
          word-break: normal;
          overflow-wrap: break-word;
          padding: 0 0.5rem;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .ticket-qr-card {
            padding: 1rem 0.75rem;
            margin: 0.75rem auto;
            width: 100%;
          }
          
          .ticket-qr-inner {
            padding: 1rem 0.5rem;
          }
        }
      `}</style>

      <div className="ticket-qr-card">
        <div style={{ width: '100%', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 0.5rem 0' }}>
            {eventTitle}
          </h3>
          <p style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: '700', margin: 0 }}>
            📅 {eventDate}
          </p>
        </div>

        {!isRegistered ? (
          <div className="ticket-qr-inner">
            <p style={{ fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '600', lineHeight: '1.5', margin: '0 0 1.25rem 0' }}>
              Debes registrarte para desbloquear tu código QR y descargar tu entrada con total accesibilidad.
            </p>
            <button
              type="button"
              onClick={handleRegister}
              disabled={loading}
              style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontWeight: '700',
                padding: '0.85rem 1.25rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                width: '100%',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? 'Procesando...' : 'Registrarse en el evento'}
            </button>
          </div>
        ) : (
          <div className="ticket-qr-inner">
            {/* Contenedor optimizado, cuadrado y con colores correctos para lectura */}
            <div className="qr-code-wrapper">
              <QRCodeSVG value={ticketId} fgColor="#0b1120" bgColor="#ffffff" />
            </div>
            
            <p className="ticket-id-container">
              ID Ticket: <span style={{ color: '#f8fafc', display: 'inline-block', wordBreak: 'break-all' }}>{ticketId}</span>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginBottom: '1.25rem', boxSizing: 'border-box' }}>
              <button 
                type="button" 
                onClick={handleDownload}
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', fontWeight: '700', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                📥 Descargar Entrada
              </button>
              <button 
                type="button" 
                onClick={handleShareWhatsApp}
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', fontWeight: '700', backgroundColor: '#16a34a', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                💬 Compartir por WhatsApp
              </button>
              <button 
                type="button" 
                onClick={handleShareGeneral}
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', fontWeight: '700', backgroundColor: '#475569', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                {copied ? '¡Copiado al portapapeles!' : '🔗 Copiar Enlace'}
              </button>
            </div>

            <div>
              <span style={{ 
                backgroundColor: '#14532d', 
                color: '#dcfce7', 
                padding: '0.4rem 1rem', 
                borderRadius: '9999px', 
                fontSize: '0.9rem', 
                fontWeight: '700',
                display: 'inline-block',
                border: '1px solid #4ade80'
              }}>
                ✓ Confirmado y Registrado
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketQR;