// src/components/SupportForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../styles/spectatorcatalog.scss';

const SupportForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    consultaType: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // En cuanto el usuario empieza a escribir o cambiar algo en una nueva incidencia, ocultamos el mensaje anterior
    if (submitted) {
      setSubmitted(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Configuramos los datos para abrir Gmail en una pestaña nueva con tu correo oficial
    const recipientEmail = "nnnmantillam@gmail.com";
    const emailSubject = encodeURIComponent(`[Soporte Spectator] ${formData.consultaType}: ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `Tipo de consulta: ${formData.consultaType}\nAsunto: ${formData.subject}\n\nMensaje:\n${formData.message}`
    );

    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${emailSubject}&body=${emailBody}`;

    // Abrimos Gmail en una pestaña nueva sin salir de la landing
    window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
    
    // 1. Activamos la tarjeta de éxito
    setSubmitted(true);
    
    // 2. Limpiamos los campos del formulario por completo
    setFormData({
      consultaType: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="spectator-support-container">
      <div className="spectator-support-stack">
        
        {/* TARJETA 1: PREGUNTAS FRECUENTES A TODO ANCHO */}
        <div className="spectator-support-card">
          <h2 className="spectator-support-card__title">Preguntas Frecuentes</h2>
          <div className="spectator-faq-grid">
            <div className="spectator-faq-item">
              <h3 className="spectator-faq-item__title">¿Cómo descargo mis entradas compradas?</h3>
              <p className="spectator-faq-item__text">Una vez finalizada la reserva, pulsa el botón de descarga para guardar tu comprobante oficial en PDF.</p>
            </div>
            <div className="spectator-faq-item">
              <h3 className="spectator-faq-item__title">¿Puedo compartir mis accesos por WhatsApp?</h3>
              <p className="spectator-faq-item__text">Sí, dispones de un botón directo en la pantalla de éxito para enviar los detalles de manera inmediata.</p>
            </div>
            <div className="spectator-faq-item">
              <h3 className="spectator-faq-item__title">¿Cómo contactar con el equipo de soporte?</h3>
              <p className="spectator-faq-item__text">Rellena el formulario inferior con tu incidencia y se abrirá tu cliente de correo hacia nuestro buzón oficial.</p>
            </div>
          </div>
        </div>

        {/* TARJETA 2: CENTRO DE SOPORTE Y FORMULARIO A TODO ANCHO */}
        <div className="spectator-support-card">
          <h2 className="spectator-support-card__title">Centro de Soporte y Ayuda</h2>
          <p className="spectator-support-card__subtitle">
            ¿Tienes alguna incidencia? Envíanos una consulta detallada y te responderemos con la mayor brevedad posible.
          </p>

          <form onSubmit={handleSubmit} className="spectator-support-form">
            
            {/* Campo: Tipo de consulta */}
            <div className="spectator-support-form__group">
              <label htmlFor="consultaType" className="spectator-support-form__label">
                Tipo de consulta *
              </label>
              <select
                id="consultaType"
                name="consultaType"
                value={formData.consultaType}
                onChange={handleChange}
                className="spectator-support-form__select"
                required
              >
                <option value="" disabled>-- Selecciona una opción --</option>
                <option value="Inscripciones y Accesos">Inscripciones y accesos a eventos</option>
                <option value="Incidencia Técnica">Incidencia técnica en la plataforma</option>
                <option value="Consulta General">Consulta de carácter general</option>
              </select>
            </div>

            {/* Campo: Asunto */}
            <div className="spectator-support-form__group">
              <label htmlFor="subject" className="spectator-support-form__label">
                Asunto *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Breve resumen de tu consulta (mín. 5 caracteres)"
                minLength={5}
                className="spectator-support-form__input"
                required
              />
            </div>

            {/* Campo: Mensaje */}
            <div className="spectator-support-form__group">
              <label htmlFor="message" className="spectator-support-form__label">
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Escribe los detalles completos de tu consulta o incidencia..."
                className="spectator-support-form__textarea"
                required
              />
            </div>

            {/* Botón de Envío con Color Cian Profesional */}
            <button type="submit" className="spectator-btn spectator-btn--cyan spectator-btn--full">
              Enviar consulta por correo electrónico
            </button>

            {/* Mensaje de éxito que aparece solo al enviar y desaparece al escribir una nueva incidencia */}
            {submitted && (
              <div className="spectator-success-alert">
                ✨ <strong>¡Borrador generado con éxito!</strong> Se ha abierto Gmail en una pestaña nueva con tu mensaje hacia <strong>nnnmantillam@gmail.com</strong>. El formulario ha quedado limpio y listo para nuevas consultas.
              </div>
            )}

          </form>
        </div>

      </div>

      <div className="spectator-back-wrapper">
        <button onClick={() => navigate(-1)} className="spectator-btn-back">
          ← Volver al catálogo
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default SupportForm;