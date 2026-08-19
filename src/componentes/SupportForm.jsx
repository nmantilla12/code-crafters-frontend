import React, { useState } from 'react';

const SupportForm = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    queryType: '',
    subject: '',
    message: ''
  });

  // Estado para errores y estado de envío exitoso
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiamos el error del campo al escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validación de campos obligatorios
  const validate = () => {
    let newErrors = {};
    if (!formData.queryType) {
      newErrors.queryType = 'Por favor, selecciona un tipo de consulta.';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje no puede estar vacío.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
    }
    return newErrors;
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
    } else {
      setErrors({});
      setIsSubmitted(true);
      // Aquí podrías enviar los datos a una API o backend si fuera necesario
      console.log('Formulario enviado con éxito:', formData);
    }
  };

  return (
    <div className="support-form-container">
      <h3 className="support-form-container__title">Envíanos tu consulta</h3>
      <p className="support-form-container__desc">
        Completa el formulario y nuestro equipo de soporte te responderá lo antes posible.
      </p>

      {isSubmitted && (
        <div className="support-form-container__success" role="alert">
          ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.
        </div>
      )}

      <form className="support-form" onSubmit={handleSubmit} noValidate>
        {/* Selector de tipo de consulta */}
        <div className="support-form__group">
          <label htmlFor="queryType" className="support-form__label">
            Tipo de consulta <span className="support-form__required">*</span>
          </label>
          <select
            id="queryType"
            name="queryType"
            className={`support-form__select ${errors.queryType ? 'support-form__select--error' : ''}`}
            value={formData.queryType}
            onChange={handleChange}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="room-change">Cambio de sala o ubicación</option>
            <option value="technical">Incidencia técnica / Acceso</option>
            <option value="registration">Dudas sobre inscripciones</option>
            <option value="other">Otro asunto</option>
          </select>
          {errors.queryType && <span className="support-form__error-text">{errors.queryType}</span>}
        </div>

        {/* Asunto */}
        <div className="support-form__group">
          <label htmlFor="subject" className="support-form__label">
            Asunto <span className="support-form__required">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={`support-form__input ${errors.subject ? 'support-form__input--error' : ''}`}
            placeholder="Breve resumen de tu consulta"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <span className="support-form__error-text">{errors.subject}</span>}
        </div>

        {/* Mensaje */}
        <div className="support-form__group">
          <label htmlFor="message" className="support-form__label">
            Mensaje <span className="support-form__required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className={`support-form__textarea ${errors.message ? 'support-form__textarea--error' : ''}`}
            placeholder="Escribe los detalles de tu consulta aquí (mínimo 10 caracteres)..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <span className="support-form__error-text">{errors.message}</span>}
        </div>

        {/* Botón de envío */}
        <button type="submit" className="support-form__submit-btn">
          Enviar consulta
        </button>
      </form>
    </div>
  );
};

export default SupportForm;