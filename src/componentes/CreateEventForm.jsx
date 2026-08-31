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

    // Mapeo adaptado a la estructura de tu events.json
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

    // Sincronización automática con localStorage para mantener el flujo sin errores
    const savedEvents = JSON.parse(localStorage.getItem('codeCraftersEvents')) || [];
    const updatedEvents = [newEvent, ...savedEvents];
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));

    setSuccessMessage(
      status === 'Publicado' 
        ? '¡Evento publicado con éxito y añadido al catálogo!' 
        : '¡Evento guardado como borrador correctamente!'
    );

    // Limpiamos el formulario tras el éxito
    setFormData({
      title: '',
      date: '',
      modality: '',
      locationOrLink: '',
      image: null,
    });
  };

  return (
    <>
      <style>{`
        .event-form-page-container {
          width: 100%;
          padding: 2rem 1rem;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .event-form {
          background-color: #0f172a;
          color: #ffffff;
          padding: 2.5rem;
          border-radius: 12px;
          border: 2px solid #334155;
          width: 100%;
          max-width: 850px;
          margin: 0 auto;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .event-form__title {
          margin: 0 0 1.75rem 0;
          font-size: 1.8rem;
          font-weight: 800;
          color: #f8fafc;
          border-bottom: 2px solid #334155;
          padding-bottom: 1rem;
        }

        .event-form__success {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-align: center;
        }

        .event-form__group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .event-form__label {
          font-size: 1rem;
          font-weight: 700;
          color: #e2e8f0;
        }

        .event-form__required {
          color: #f87171;
        }

        .event-form__input,
        .event-form__select {
          background-color: #1e293b;
          border: 2px solid #475569;
          color: #ffffff;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          font-size: 1rem;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }

        .event-form__input:focus,
        .event-form__select:focus {
          outline: none;
          border-color: #0284c7;
        }

        .event-form__input--error,
        .event-form__select--error {
          border-color: #ef4444;
        }

        .event-form__error-text {
          color: #fca5a5;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .event-form__input-file {
          background-color: #1e293b;
          border: 2px dashed #475569;
          padding: 1rem;
          border-radius: 8px;
          color: #cbd5e1;
          cursor: pointer;
          width: 100%;
          box-sizing: border-box;
        }

        .event-form__actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .event-form__btn-draft,
        .event-form__submit-btn {
          flex: 1;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .event-form__btn-draft {
          background-color: #334155;
          color: #f8fafc;
          border: 1px solid #475569;
        }

        .event-form__btn-draft:hover {
          background-color: #475569;
        }

        .event-form__submit-btn {
          background-color: #0284c7;
          color: #ffffff;
          border: none;
        }

        .event-form__submit-btn:hover {
          background-color: #0369a1;
        }

        @media (max-width: 640px) {
          .event-form-page-container {
            padding: 1rem 0.5rem;
          }
          .event-form {
            padding: 1.5rem 1rem;
          }
          .event-form__actions {
            flex-direction: column;
          }
        }
      `}</style>

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
      </div>
    </>
  );
};

export default CreateEventForm;