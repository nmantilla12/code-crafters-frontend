import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/event-form.scss';

const CreateEventForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    modality: '',
    locationOrLink: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

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

  const handleSubmit = (e, status = 'Publicado') => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    setErrors({});
    
    // Creamos el objeto del nuevo evento adaptado a tu events.json
    const newLocalEvent = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.modality === 'online' ? 'Online' : 'General',
      date: formData.date,
      location: formData.locationOrLink,
      attendees: "0",
      status: status,
      icon: formData.modality === 'online' ? '🌐' : '📍',
      description: `Modalidad: ${formData.modality} - Creado desde el panel de gestión.`,
      type: 'standard',
      registeredUsers: []
    };

    // Guardado y persistencia en localStorage
    const savedEvents = JSON.parse(localStorage.getItem('codeCraftersEvents')) || [];
    const updatedEvents = [newLocalEvent, ...savedEvents];
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));

    setSuccessMessage(
      status === 'Publicado' 
        ? '¡Evento publicado con éxito! Redirigiendo...' 
        : '¡Evento guardado como borrador correctamente! Redirigiendo...'
    );

    // Redirección automática tras el éxito
    setTimeout(() => {
      navigate('/organizer/dashboard');
    }, 1500);
  };

  return (
    <form className="event-form" onSubmit={(e) => handleSubmit(e, 'Publicado')} noValidate>
      <h2 className="event-form__title">Crear Nuevo Evento</h2>

      {successMessage && (
        <div className="event-form__success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="title">
          Título del Evento <span className="event-form__required">*</span>
        </label>
        <input 
          className={`event-form__input ${errors.title ? 'event-form__input--error' : ''}`}
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
        />
        {errors.title && <span className="event-form__error-text">{errors.title}</span>}
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="date">
          Fecha <span className="event-form__required">*</span>
        </label>
        <input 
          className={`event-form__input ${errors.date ? 'event-form__input--error' : ''}`}
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
        />
        {errors.date && <span className="event-form__error-text">{errors.date}</span>}
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="modality">
          Modalidad <span className="event-form__required">*</span>
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
        {errors.modality && <span className="event-form__error-text">{errors.modality}</span>}
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="locationOrLink">
          Ubicación o Enlace <span className="event-form__required">*</span>
        </label>
        <input 
          className={`event-form__input ${errors.locationOrLink ? 'event-form__input--error' : ''}`}
          type="text" 
          id="locationOrLink" 
          name="locationOrLink" 
          value={formData.locationOrLink} 
          onChange={handleChange} 
        />
        {errors.locationOrLink && <span className="event-form__error-text">{errors.locationOrLink}</span>}
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

      <div className="event-form__actions">
        <button 
          type="button" 
          className="event-form__btn-draft"
          onClick={(e) => handleSubmit(e, 'Borrador')}
        >
          Guardar como borrador
        </button>
        <button 
          type="submit" 
          className="event-form__submit-btn"
        >
          Publicar evento
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;