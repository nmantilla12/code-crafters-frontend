import React, { useState } from 'react';
// Si tienes estilos SASS, puedes importarlos aquí
// import './EventForm.scss'; 

const EventForm = () => {
  // Estado inicial que coincide con las llaves de tu JSON
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
    if (!formData.title) tempErrors.title = "El título es obligatorio";
    if (!formData.category) tempErrors.category = "La categoría es obligatoria";
    if (!formData.date) tempErrors.date = "La fecha es obligatoria";
    if (!formData.location) tempErrors.location = "La ubicación es obligatoria";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulario válido, enviando datos:", formData);
      // Aquí más adelante conectaremos con tu events.json
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h3>Crear nuevo evento</h3>
      
      <input name="title" placeholder="Título" onChange={handleChange} />
      {errors.title && <span>{errors.title}</span>}

      <input name="category" placeholder="Categoría" onChange={handleChange} />
      {errors.category && <span>{errors.category}</span>}

      <input type="date" name="date" onChange={handleChange} />
      {errors.date && <span>{errors.date}</span>}

      <input name="location" placeholder="Ubicación" onChange={handleChange} />
      {errors.location && <span>{errors.location}</span>}

      <textarea name="description" placeholder="Descripción" onChange={handleChange} />

      <button type="submit">Guardar Evento</button>
    </form>
  );
};

export default EventForm;