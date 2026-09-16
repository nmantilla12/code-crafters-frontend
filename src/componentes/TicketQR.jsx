// src/components/TicketQR.jsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Footer from './Footer';

const TicketQR = ({ eventTitle, eventDate, ticketId, currentUserEmail, onBack }) => {
  
  const handleDownloadPDF = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `¡Hola! Te comparto mi entrada oficial para el evento *${eventTitle}*.\nFecha: ${eventDate}\nID de Ticket: ${ticketId}\n¡Nos vemos en el evento!`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <div className="ticket-page-wrapper">
      
      {/* Contenedor central donde va la tarjeta del ticket */}
      <div className="ticket-page-center">
        <div className="ticket-qr">
          
          <div className="ticket-qr__header">
            <h2 className="ticket-qr__title">{eventTitle}</h2>
            <p className="ticket-qr__subtitle">📅 {eventDate}</p>
          </div>

          <div className="ticket-qr__code-container">
            <QRCodeSVG 
              value={`TICKET-${ticketId}-${eventTitle}`} 
              size={160}
              level="H"
            />
          </div>

          <div className="ticket-qr__details">
            <p>Asistente: {currentUserEmail ? currentUserEmail : 'Registrado'}</p>
            <p className="ticket-qr__id-text">ID Ticket: {ticketId}</p>
          </div>

          <div className="ticket-qr__actions">
            <button type="button" className="ticket-qr__btn-download" onClick={handleDownloadPDF}>
              📥 Descargar Entrada (PDF)
            </button>
            <button type="button" className="ticket-qr__btn-whatsapp" onClick={handleWhatsAppShare}>
              💬 Compartir por WhatsApp
            </button>
          </div>

          {onBack && (
            <div className="ticket-qr__footer-nav">
              <button type="button" className="ticket-qr__btn-back" onClick={onBack}>
                ← Finalizar / Volver al Inicio
              </button>
            </div>
          )}

          {/* Firma para la impresión en PDF */}
          <div className="print-footer-signature">
            <p>Code Crafters - Plataforma Oficial de Gestión de Eventos © 2026</p>
          </div>

        </div>
      </div>

      {/* Footer oficial de la web */}
      <Footer />

    </div>
  );
};

export default TicketQR;