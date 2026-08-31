// src/components/SupportForm.jsx
import React, { useState } from 'react';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    userRole: 'attendee', // 'attendee' (usuario/asistente) o 'organizer' (organizador)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
    } else {
      setErrors({});
      setIsSubmitted(true);
      console.log('Consulta de soporte enviada con éxito:', formData);
    }
  };

  const handleReset = () => {
    setFormData({ userRole: 'attendee', queryType: '', subject: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <div 
      className="support-page-wrapper"
      style={{
        width: '100%',
        backgroundColor: '#0b1120',
        padding: '1rem 0 3.5rem 0', // Espacio inferior generoso para que no peguen los botones de abajo
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowX: 'hidden'
      }}
    >
      {/* Contenedor central expandido y adaptable */}
      <div 
        className="support-form-container"
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto 2.5rem auto', // Margen inferior para separar la tarjeta de los botones de navegación
          padding: '2rem 1.5rem',
          backgroundColor: '#0f172a',
          border: '2px solid #334155',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          boxSizing: 'border-box',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <h3 
          className="support-form-container__title"
          style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: '#f8fafc' }}
        >
          Centro de Soporte y Gestión
        </h3>
        <p 
          className="support-form-container__desc"
          style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '1.75rem', fontWeight: '500' }}
        >
          Completa el formulario indicando tu perfil de usuario u organizador. Te atenderemos de forma prioritaria.
        </p>

        {isSubmitted ? (
          <div 
            className="support-form-success-box" 
            style={{ 
              background: '#1e293b', 
              border: '2px solid #334155', 
              borderRadius: '8px', 
              padding: '2rem 1rem', 
              textAlign: 'center', 
              marginTop: '1.5rem',
              boxSizing: 'border-box',
              width: '100%'
            }}
          >
            <div 
              className="support-form-container__success" 
              role="alert" 
              style={{ color: '#38bdf8', marginBottom: '1.5rem', fontSize: '1.15rem', fontWeight: '700', lineHeight: '1.5' }}
            >
              ¡Consulta enviada correctamente como {formData.userRole === 'organizer' ? 'Organizador' : 'Asistente'}! Nuestro equipo te responderá pronto.
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                onClick={handleReset}
                style={{ 
                  background: '#38bdf8', 
                  color: '#0f172a', 
                  border: 'none', 
                  padding: '0.85rem 1.5rem', 
                  borderRadius: '6px', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  fontSize: '1rem' 
                }}
              >
                Enviar otra consulta
              </button>
            </div>
          </div>
        ) : (
          <form className="support-form" onSubmit={handleSubmit} noValidate style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', boxSizing: 'border-box' }}>
            
            {/* Selector de Rol */}
            <div className="support-form__group" style={{ width: '100%', boxSizing: 'border-box' }}>
              <label htmlFor="userRole" className="support-form__label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>
                Perfil de usuario <span className="support-form__required" style={{ color: '#f87171' }} aria-hidden="true">*</span>
              </label>
              <select
                id="userRole"
                name="userRole"
                className={`support-form__select ${errors.userRole ? 'support-form__select--error' : ''}`}
                value={formData.userRole}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  maxWidth: '100%',
                  padding: '0.85rem', 
                  background: '#1e293b', 
                  border: '2px solid #475569', 
                  borderRadius: '6px', 
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '500',
                  boxSizing: 'border-box'
                }}
              >
                <option value="attendee">Asistente / Usuario registrado</option>
                <option value="organizer">Organizador de eventos</option>
              </select>
              {errors.userRole && <span className="support-form__error-text" style={{ color: '#f87171', fontSize: '0.9rem', display: 'block', marginTop: '0.35rem', fontWeight: '600' }}>{errors.userRole}</span>}
            </div>

            {/* Tipo de consulta */}
            <div className="support-form__group" style={{ width: '100%', boxSizing: 'border-box' }}>
              <label htmlFor="queryType" className="support-form__label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>
                Tipo de consulta <span className="support-form__required" style={{ color: '#f87171' }} aria-hidden="true">*</span>
              </label>
              <select
                id="queryType"
                name="queryType"
                className={`support-form__select ${errors.queryType ? 'support-form__select--error' : ''}`}
                value={formData.queryType}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  maxWidth: '100%',
                  padding: '0.85rem', 
                  background: '#1e293b', 
                  border: '2px solid #475569', 
                  borderRadius: '6px', 
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '500',
                  boxSizing: 'border-box'
                }}
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
              {errors.queryType && <span className="support-form__error-text" style={{ color: '#f87171', fontSize: '0.9rem', display: 'block', marginTop: '0.35rem', fontWeight: '600' }}>{errors.queryType}</span>}
            </div>

            {/* Asunto */}
            <div className="support-form__group" style={{ width: '100%', boxSizing: 'border-box' }}>
              <label htmlFor="subject" className="support-form__label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>
                Asunto <span className="support-form__required" style={{ color: '#f87171' }} aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={`support-form__input ${errors.subject ? 'support-form__input--error' : ''}`}
                placeholder="Breve resumen de tu consulta (mín. 5 caracteres)"
                value={formData.subject}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  maxWidth: '100%',
                  padding: '0.85rem', 
                  background: '#1e293b', 
                  border: '2px solid #475569', 
                  borderRadius: '6px', 
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '500',
                  boxSizing: 'border-box'
                }}
              />
              {errors.subject && <span className="support-form__error-text" style={{ color: '#f87171', fontSize: '0.9rem', display: 'block', marginTop: '0.35rem', fontWeight: '600' }}>{errors.subject}</span>}
            </div>

            {/* Mensaje */}
            <div className="support-form__group" style={{ width: '100%', boxSizing: 'border-box' }}>
              <label htmlFor="message" className="support-form__label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>
                Mensaje <span className="support-form__required" style={{ color: '#f87171' }} aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className={`support-form__textarea ${errors.message ? 'support-form__textarea--error' : ''}`}
                placeholder="Escribe los detalles completos de tu consulta o incidencia (mínimo 10 caracteres)..."
                value={formData.message}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  maxWidth: '100%',
                  padding: '0.85rem', 
                  background: '#1e293b', 
                  border: '2px solid #475569', 
                  borderRadius: '6px', 
                  color: '#ffffff', 
                  resize: 'vertical',
                  fontSize: '1rem',
                  fontWeight: '500',
                  boxSizing: 'border-box'
                }}
              ></textarea>
              {errors.message && <span className="support-form__error-text" style={{ color: '#f87171', fontSize: '0.9rem', display: 'block', marginTop: '0.35rem', fontWeight: '600' }}>{errors.message}</span>}
            </div>

            {/* Botón de envío */}
            <button 
              type="submit" 
              className="support-form__submit-btn" 
              style={{ 
                background: '#0284c7', 
                color: '#ffffff', 
                border: 'none', 
                padding: '0.95rem 1.5rem', 
                borderRadius: '6px', 
                fontWeight: '700', 
                cursor: 'pointer', 
                width: '100%',
                maxWidth: '100%',
                fontSize: '1.05rem',
                marginTop: '0.5rem',
                boxSizing: 'border-box',
                transition: 'background-color 0.2s'
              }}
            >
              Enviar consulta de soporte
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SupportForm;