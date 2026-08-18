import React, { useState } from 'react';
// Importa tus estilos si lo necesitas:
// import '../../styles/main.scss'; 

const EventForm = ({ onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "El título es obligatorio";
    if (!formData.category.trim()) tempErrors.category = "La categoría es obligatoria";
    if (!formData.date) tempErrors.date = "La fecha es obligatoria";
    if (!formData.location.trim()) tempErrors.location = "La ubicación es obligatoria";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulario válido, enviando datos:", formData);
      if (onAddEvent) {
        onAddEvent(formData);
      }
      // Limpiar formulario tras enviar con éxito
      setFormData({
        title: '',
        category: '',
        date: '',
        location: '',
        description: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h3 className="event-form__title">Crear nuevo evento</h3>
      
      <div className="event-form__group">
        <input 
          className="event-form__input"
          name="title" 
          placeholder="Título" 
          value={formData.title}
          onChange={handleChange} 
        />
        {errors.title && <span className="event-form__error">{errors.title}</span>}
      </div>

      <div className="event-form__group">
        <input 
          className="event-form__input"
          name="category" 
          placeholder="Categoría" 
          value={formData.category}
          onChange={handleChange} 
        />
        {errors.category && <span className="event-form__error">{errors.category}</span>}
      </div>

      <div className="event-form__group">
        <input 
          className="event-form__input"
          type="date" 
          name="date" 
          value={formData.date}
          onChange={handleChange} 
        />
        {errors.date && <span className="event-form__error">{errors.date}</span>}
      </div>

      <div className="event-form__group">
        <input 
          className="event-form__input"
          name="location" 
          placeholder="Ubicación" 
          value={formData.location}
          onChange={handleChange} 
        />
        {errors.location && <span className="event-form__error">{errors.location}</span>}
      </div>

      <div className="event-form__group">
        <textarea 
          className="event-form__textarea"
          name="description" 
          placeholder="Descripción" 
          value={formData.description}
          onChange={handleChange} 
        />
      </div>

      <button className="event-form__button" type="submit">Guardar Evento</button>
    </form>
  );
};

export default EventForm;