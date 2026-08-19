import React, { useState } from 'react';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    modality: '',
    locationOrLink: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del evento creados:', formData);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2 className="event-form__title">Crear Nuevo Evento</h2>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="title">Título del Evento</label>
        <input 
          className="event-form__input"
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="date">Fecha</label>
        <input 
          className="event-form__input"
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="modality">Modalidad</label>
        <select 
          className="event-form__select"
          id="modality" 
          name="modality" 
          value={formData.modality} 
          onChange={handleChange} 
          required
        >
          <option value="">Selecciona una modalidad</option>
          <option value="presencial">Presencial</option>
          <option value="online">Online</option>
          <option value="hibrido">Híbrido</option>
        </select>
      </div>

      <div className="event-form__group">
        <label className="event-form__label" htmlFor="locationOrLink">Ubicación o Enlace</label>
        <input 
          className="event-form__input"
          type="text" 
          id="locationOrLink" 
          name="locationOrLink" 
          value={formData.locationOrLink} 
          onChange={handleChange} 
          required 
        />
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

      {/* Botón con type="submit" explícito para evitar alertas del linter */}
      <button type="submit" className="event-form__submit-btn">
        Guardar Evento
      </button>
    </form>
  );
};

export default CreateEventForm;