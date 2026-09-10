// src/componentes/SupportForm.jsx
import React, { useState } from 'react';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    userRole: 'attendee', 
    queryType: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.userRole) {
      newErrors.userRole = 'Por favor, selecciona tu rol en la plataforma.';
    }
    if (!formData.queryType) {
      newErrors.queryType = 'Por favor, selecciona un tipo de consulta.';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio.';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'El asunto debe tener al menos 5 caracteres.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje no puede estar vacío.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
    }
    return newErrors;
  };

  const supportEmail = "nnnmantillam@gmail.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
    } else {
      setErrors({});
      setIsSubmitted(true);
      
      const existingQueries = JSON.parse(localStorage.getItem('codeCraftersSupportQueries')) || [];
      const newQuery = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString()
      };
      localStorage.setItem('codeCraftersSupportQueries', JSON.stringify([...existingQueries, newQuery]));

      const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(`[${formData.userRole.toUpperCase()}] ${formData.subject}`)}&body=${encodeURIComponent(`Tipo de consulta: ${formData.queryType}\n\nMensaje:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
    }
  };

  const handleReset = () => {
    setFormData({ userRole: 'attendee', queryType: '', subject: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <>
      {isSubmitted ? (
        <div>
          <div className="support-form-container__success" role="alert">
            ¡Formulario procesado! Se ha abierto tu correo para completar el envío.
          </div>
          
          <div className="support-form__actions">
            <a 
              href={`mailto:${supportEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
              className="support-form__submit-btn"
            >
              📧 Reabrir correo electrónico
            </a>

            <button 
              type="button" 
              onClick={handleReset}
              className="support-form__submit-btn support-form__submit-btn--secondary"
            >
              Enviar otra consulta
            </button>
          </div>
        </div>
      ) : (
        <form className="support-form" onSubmit={handleSubmit} noValidate>
          
          <div className="support-form__group">
            <label htmlFor="userRole" className="support-form__label">
              Perfil de usuario <span className="support-form__required" aria-hidden="true">*</span>
            </label>
            <select
              id="userRole"
              name="userRole"
              className={`support-form__select ${errors.userRole ? 'support-form__select--error' : ''}`}
              value={formData.userRole}
              onChange={handleChange}
            >
              <option value="attendee">Asistente / Usuario registrado</option>
              <option value="organizer">Organizador de eventos</option>
            </select>
            {errors.userRole && <span className="support-form__error-text">{errors.userRole}</span>}
          </div>

          <div className="support-form__group">
            <label htmlFor="queryType" className="support-form__label">
              Tipo de consulta <span className="support-form__required" aria-hidden="true">*</span>
            </label>
            <select
              id="queryType"
              name="queryType"
              className={`support-form__select ${errors.queryType ? 'support-form__select--error' : ''}`}
              value={formData.queryType}
              onChange={handleChange}
            >
              <option value="">-- Selecciona una opción --</option>
              {formData.userRole === 'organizer' ? (
                <>
                  <option value="create-event">Creación y publicación de eventos</option>
                  <option value="manage-attendees">Gestión de aforo y asistentes</option>
                  <option value="room-assignment">Cambio de sala o recursos técnicos</option>
                </>
              ) : (
                <>
                  <option value="registration">Dudas sobre inscripción y código QR</option>
                  <option value="download-ticket">Problemas al descargar la entrada</option>
                  <option value="technical">Incidencia de acceso / plataforma</option>
                </>
              )}
              <option value="other">Otro asunto general</option>
            </select>
            {errors.queryType && <span className="support-form__error-text">{errors.queryType}</span>}
          </div>

          <div className="support-form__group">
            <label htmlFor="subject" className="support-form__label">
              Asunto <span className="support-form__required" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className={`support-form__input ${errors.subject ? 'support-form__input--error' : ''}`}
              placeholder="Breve resumen de tu consulta (mín. 5 caracteres)"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <span className="support-form__error-text">{errors.subject}</span>}
          </div>

          <div className="support-form__group">
            <label htmlFor="message" className="support-form__label">
              Mensaje <span className="support-form__required" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              className={`support-form__textarea ${errors.message ? 'support-form__textarea--error' : ''}`}
              placeholder="Escribe los detalles completos de tu consulta o incidencia..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <span className="support-form__error-text">{errors.message}</span>}
          </div>

          <button 
            type="submit" 
            className="support-form__submit-btn"
          >
            Enviar consulta por correo electrónico
          </button>
        </form>
      )}
    </>
  );
};

export default SupportForm;