// src/componentes/CreateEventForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEventForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    modality: '',
    locationOrLink: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    setErrors({});

    // Guardamos el evento con la ruta de la imagen seleccionada de forma persistente
    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.modality === 'online' ? 'Online' : 'General',
      date: formData.date,
      location: formData.locationOrLink,
      image: formData.image || '/images/react-code.jpg', // Imagen seleccionada o por defecto
      attendees: "0",
      status: status === 'Publicado' ? 'Publicado' : 'Borrador',
      icon: formData.modality === 'online' ? '🌐' : '📍',
      description: `Evento ${formData.modality} registrado desde el panel de gestión de eventos.`,
      type: 'standard',
      registeredUsers: []
    };

    const savedEvents = JSON.parse(localStorage.getItem('codeCraftersEvents')) || [];
    const updatedEvents = [newEvent, ...savedEvents];
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));

    setSuccessMessage(
      status === 'Publicado' 
        ? '¡Evento publicado con éxito y añadido al catálogo!' 
        : '¡Evento guardado como borrador correctamente!'
    );

    setFormData({
      title: '',
      date: '',
      modality: '',
      locationOrLink: '',
      image: '',
    });
  };

  return (
    <div className="event-form-page-container">
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
            placeholder="Ej: Taller de Arquitectura Web"
            autoComplete="off"
          />
          {errors.title && <span className="event-form__error-text">{errors.title}</span>}
        </div>

        <div className="event-form__group">
          <label className="event-form__label" htmlFor="date">
            Fecha <span className="event-form__required">*</span>
          </label>
          <input 
            className={`event-form__input ${errors.date ? 'event-form__input--error' : ''}`}
            type="text" 
            id="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            placeholder="Ej: 15 Oct, 2026"
            autoComplete="off"
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
            placeholder="Ej: Madrid, España / Enlace Zoom"
            autoComplete="off"
          />
          {errors.locationOrLink && <span className="event-form__error-text">{errors.locationOrLink}</span>}
        </div>

        {/* Desplegable de selección de imagen basado en los archivos locales disponibles */}
        <div className="event-form__group">
          <label className="event-form__label" htmlFor="image">Imagen del Evento</label>
          <select 
            className="event-form__select"
            id="image" 
            name="image" 
            value={formData.image} 
            onChange={handleChange}
          >
            <option value="">Selecciona una imagen</option>
            <option value="/images/react-code.jpg">React Code (Por defecto)</option>
            <option value="/images/ai-technology.jpg">AI Technology</option>
            <option value="/images/code-laptop.jpg">Code Laptop</option>
            <option value="/images/developer-web.jpg">Developer Web</option>
            <option value="/images/team-collaboration.jpg">Team Collaboration</option>
          </select>
        </div>

        <div className="event-form__actions">
          <button 
            type="button" 
            className="event-form__btn-back"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
          
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
          
          <button 
            type="button" 
            className="event-form__btn-next"
            onClick={() => navigate('/events')}
          >
            Ver eventos →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;