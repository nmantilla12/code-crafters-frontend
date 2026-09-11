// src/componentes/SupportForm.jsx
import React, { useState } from 'react';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    consultaType: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const recipientEmail = "soporte@tudominio.com";
    const emailSubject = encodeURIComponent(`[Soporte] ${formData.consultaType}: ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `Tipo de consulta: ${formData.consultaType}\nAsunto: ${formData.subject}\n\nMensaje:\n${formData.message}`
    );

    window.location.href = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="support-form">
      
      {/* Campo: Tipo de consulta */}
      <div className="support-form__group">
        <label htmlFor="consultaType" className="support-form__label">
          Tipo de consulta *
        </label>
        <select
          id="consultaType"
          name="consultaType"
          value={formData.consultaType}
          onChange={handleChange}
          className="support-form__select"
          required
        >
          <option value="" disabled>-- Selecciona una opción --</option>
          <option value="Inscripciones y Accesos">Inscripciones y accesos a eventos</option>
          <option value="Incidencia Técnica">Incidencia técnica en la plataforma</option>
          <option value="Consulta General">Consulta de carácter general</option>
        </select>
      </div>

      {/* Campo: Asunto */}
      <div className="support-form__group">
        <label htmlFor="subject" className="support-form__label">
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
          className="support-form__input"
          required
        />
      </div>

      {/* Campo: Mensaje (Completamente limpio, sin texto interno, listo para escribir) */}
      <div className="support-form__group">
        <label htmlFor="message" className="support-form__label">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          placeholder="Escribe los detalles completos de tu consulta o incidencia..."
          className="support-form__textarea"
          required
        />
      </div>

      {/* Botón de Envío */}
      <button type="submit" className="support-form__submit-btn">
        Enviar consulta por correo electrónico
      </button>

      {submitted && (
        <p className="support-form__success-msg">
          ¡Formulario preparado! Se ha abierto tu aplicación de correo.
        </p>
      )}

    </form>
  );
};

export default SupportForm;