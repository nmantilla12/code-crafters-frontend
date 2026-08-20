import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Añadido para la redirección
import '../styles/event-form.scss'; // Importamos los estilos para que coja todo el color y diseño

const CreateEventForm = () => {
  const navigate = useNavigate(); // 1. Inicializamos el hook

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

  const handleSubmit = (e, status = 'published') => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    setErrors({});
    
    // --- LÓGICA AÑADIDA PARA CONECTAR CON EL DASHBOARD ---
    const statusText = status === 'published' ? 'Publicado' : 'Borrador';
    const newEvent = {
      id: Date.now(),
      title: formData.title,
      date: formData.date,
      status: statusText,
    };

    const existingEvents = JSON.parse(localStorage.getItem('dashboard_events')) || [];
    const updatedEvents = [newEvent, ...existingEvents];
    localStorage.setItem('dashboard_events', JSON.stringify(updatedEvents));
    // -----------------------------------------------------

    const eventFinalData = { ...formData, status };
    console.log(`Evento ${status === 'published' ? 'publicado' : 'guardado como borrador'}:`, eventFinalData);
    
    setSuccessMessage(
      status === 'published' 
        ? '¡Evento publicado con éxito! Redirigiendo...' 
        : '¡Evento guardado como borrador correctamente! Redirigiendo...'
    );

    // --- AÑADIDO: Redirección automática al Dashboard tras el éxito ---
    setTimeout(() => {
      navigate('/organizer/dashboard');
    }, 1500);
  };

  return (
    <form className="event-form" onSubmit={(e) => handleSubmit(e, 'published')} noValidate>
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
          onClick={(e) => handleSubmit(e, 'draft')}
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