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

    // Limpiamos el error del campo correspondiente al escribir
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

    // Mapeo adaptado a la estructura de tus eventos
    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.modality === 'online' ? 'Online' : 'General',
      date: formData.date,
      location: formData.locationOrLink,
      attendees: "0",
      status: status === 'Publicado' ? 'Publicado' : 'Borrador',
      icon: formData.modality === 'online' ? '🌐' : '📍',
      description: `Evento ${formData.modality} registrado desde el panel de gestión de eventos.`,
      type: 'standard',
      registeredUsers: []
    };

    // Sincronización automática con localStorage
    const savedEvents = JSON.parse(localStorage.getItem('codeCraftersEvents')) || [];
    const updatedEvents = [newEvent, ...savedEvents];
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));

    const msg = status === 'Publicado' 
      ? '¡Evento publicado con éxito y añadido al catálogo!' 
      : '¡Evento guardado como borrador correctamente!';
      
    setSuccessMessage(msg);

    // Limpiamos el formulario
    setFormData({
      title: '',
      date: '',
      modality: '',
      locationOrLink: '',
      image: null,
    });

    // Redirección automática tras 1.5 segundos para que alcance a leerse el mensaje de éxito
    setTimeout(() => {
      navigate('/events'); // O la ruta donde muestras tu lista de eventos
    }, 1500);
  };

  return (
    <div className="event-form-page-container">
      <form className="event-form" onSubmit={(e) => handleSubmit(e, 'Publicado')} noValidate>
        <h2 className="event-form__title">Crear Nuevo Evento</h2>

        {successMessage && (
          <div className="event-form__success" role="alert" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', padding: '12px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #06b6d4', fontWeight: 'bold' }}>
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

        <div className="event-form__group">
          <label className="event-form__label" htmlFor="image">Carga de Imagen o Ícono</label>
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
            Siguiente →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;