import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const TicketQR = ({ eventTitle, eventDate, ticketId, eventId, currentUserEmail, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: currentUserEmail || '',
    password: ''
  });

  const [copied, setCopied] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Por favor, completa todos los campos del formulario (Nombre, Correo y Contraseña).");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setIsRegistered(true);
      setLoading(false);
      if (onRegisterSuccess) onRegisterSuccess(formData);
    }, 600);
  };

  const handleShareWhatsApp = () => {
    const ticketDetails = `¡Hola! 🎟️ Te comparto mi entrada oficial:\n\n📌 *${eventTitle}*\n📅 Fecha: ${eventDate}\n👤 Asistente: ${formData.name}\n🆔 ID de Ticket: ${ticketId}\n\n¡Nos vemos en el evento!`;
    const message = encodeURIComponent(ticketDetails);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const handleShareGeneral = async () => {
    try {
      await navigator.clipboard.writeText(`Entrada: ${eventTitle} - Asistente: ${formData.name} - ID: ${ticketId}`);
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
      `Asistente: ${formData.name}\n` +
      `Correo: ${formData.email}\n` +
      `Evento: ${eventTitle}\n` +
      `Fecha: ${eventDate}\n` +
      `ID de Ticket: ${ticketId}\n` +
      `Estado: Confirmado y Registrado\n` +
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
        <form onSubmit={handleRegister} className="ticket-qr__form">
          {/* Texto simplificado exactamente como pediste */}
          <p className="ticket-qr__subtitle" style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#94a3b8' }}>
            Completa tus datos de registro
          </p>

          <div style={{ marginBottom: '0.85rem', textAlign: 'left' }}>
            <label htmlFor="register-name" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: '#94a3b8' }}>
              Nombre del asistente
            </label>
            <input 
              id="register-name"
              type="text"
              name="name"
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
              required
            />
          </div>

          <div style={{ marginBottom: '0.85rem', textAlign: 'left' }}>
            <label htmlFor="register-email" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: '#94a3b8' }}>
              Correo electrónico
            </label>
            <input 
              id="register-email"
              type="email"
              name="email"
              placeholder="tu.correo@codecrafters.com"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
            <label htmlFor="register-password" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: '#94a3b8' }}>
              Contraseña
            </label>
            <input 
              id="register-password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ticket-qr__btn-download"
            style={{ width: '100%' }}
          >
            {loading ? 'Procesando...' : 'Registrarse en el evento'}
          </button>
        </form>
      ) : (
        <div>
          <div className="ticket-qr__code-container">
            <QRCodeSVG value={ticketId} fgColor="#0b1120" bgColor="#ffffff" className="ticket-qr__image" />
          </div>
          
          <div className="ticket-qr__details" style={{ margin: '1rem 0', textAlign: 'center' }}>
            <p>Asistente: <strong>{formData.name}</strong></p>
            <p>ID Ticket: <strong style={{ fontFamily: 'monospace' }}>{ticketId}</strong></p>
          </div>

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