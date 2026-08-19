import React, { useState } from 'react';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    modality: '',
    locationOrLink: '',
    image: null,
  });

  // Estados para la validación y mensajes de éxito
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    // Limpiamos el error del campo correspondiente al escribir o seleccionar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Función de validación de campos obligatorios
  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'El título del evento es obligatorio.';
    }
    if (!formData.date) {
      newErrors.date = 'La fecha del evento es obligatoria.';
    }
    if (!formData.modality) {
      newErrors.modality = 'Debes seleccionar una modalidad.';
    }
    if (!formData.locationOrLink.trim()) {
      newErrors.locationOrLink = 'La ubicación o enlace es obligatoria.';
    }
    return newErrors;
  };

  const handleSubmit = (e, status = 'published') => {
    e.preventDefault();
    const validationErrors = validate();

    // Si hay errores, no se borran los datos y se muestran los avisos
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    // Datos correctos
    setErrors({});
    const eventFinalData = { ...formData, status };
    console.log(`Evento ${status === 'published' ? 'publicado' : 'guardado como borrador'}:`, eventFinalData);
    
    setSuccessMessage(
      status === 'published' 
        ? '¡Evento publicado con éxito!' 
        : '¡Evento guardado como borrador correctamente!'
    );
  };

  return (
    <form className="event-form" onSubmit={(e) => handleSubmit(e, 'published')} noValidate>
      <h2 className="event-form__title">Crear Nuevo Evento</h2>

      {successMessage && (
        <div className="event-form__success" role="alert" style={{ color: '#22543d', backgroundColor: '#f0fff4', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
          {successMessage}
        </div>
      )}

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="title">
          Título del Evento <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <input 
          className={`event-form__input ${errors.title ? 'event-form__input--error' : ''}`}
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
        />
        {errors.title && <span className="event-form__error-text" style={{ color: '#e53e3e', fontSize: '0.75rem', marginTop: '0.2rem' }}>{errors.title}</span>}
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="date">
          Fecha <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <input 
          className={`event-form__input ${errors.date ? 'event-form__input--error' : ''}`}
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
        />
        {errors.date && <span className="event-form__error-text" style={{ color: '#e53e3e', fontSize: '0.75rem', marginTop: '0.2rem' }}>{errors.date}</span>}
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="modality">
          Modalidad <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <select 
          className={`event-form__select ${errors.modality ? 'event-form__select--error' : ''}`}
          id="modality" 
          name="modality" 
          value={formData.modality} 
          onChange={handleChange} 
        >
          <option value="">Selecciona una modalidad</option>
          <option value="presencial">Presencial</option>
          <option value="online">Online</option>
          <option value="hibrido">Híbrido</option>
        </select>
        {errors.modality && <span className="event-form__error-text" style={{ color: '#e53e3e', fontSize: '0.75rem', marginTop: '0.2rem' }}>{errors.modality}</span>}
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="locationOrLink">
          Ubicación o Enlace <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <input 
          className={`event-form__input ${errors.locationOrLink ? 'event-form__input--error' : ''}`}
          type="text" 
          id="locationOrLink" 
          name="locationOrLink" 
          value={formData.locationOrLink} 
          onChange={handleChange} 
        />
        {errors.locationOrLink && <span className="event-form__error-text" style={{ color: '#e53e3e', fontSize: '0.75rem', marginTop: '0.2rem' }}>{errors.locationOrLink}</span>}
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="image">Carga de Imagen</label>
        <input 
          className="event-form__input-file"
          type="file" 
          id="image" 
          name="image" 
          accept="image/*"
          onChange={handleChange} 
        />
      </div>

      {/* Botones de acción para cumplir con publicar o guardar en borrador */}
      <div className="event-form__actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
        <button 
          type="button" 
          className="event-form__btn-draft"
          onClick={(e) => handleSubmit(e, 'draft')}
          style={{ padding: '0.75rem 1.25rem', borderRadius: '6px', border: '1px solid #cbd5e0', background: '#fff', cursor: 'pointer', fontWeight: 600 }}
        >
          Guardar como borrador
        </button>
        <button 
          type="submit" 
          className="event-form__submit-btn"
          style={{ padding: '0.75rem 1.25rem', borderRadius: '6px', border: 'none', background: '#3182ce', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
        >
          Publicar evento
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;