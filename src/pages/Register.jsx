// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('organizer'); // Por defecto para este flujo de gestión
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Detectamos el rol según la ruta o recuperamos el almacenado
    if (location.pathname.includes('organizer')) {
      setRole('organizer');
      localStorage.setItem('userRole', 'organizer');
    } else {
      const savedRole = localStorage.getItem('userRole');
      if (savedRole) {
        setRole(savedRole);
      } else {
        localStorage.setItem('userRole', 'organizer');
      }
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Petición POST hacia tu backend de Spring Boot en el puerto 8081
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role }),
      });

      if (!response.ok) {
        throw new Error('No se pudo completar el registro en el servidor.');
      }

      handleRegisterSuccess();

    } catch (error) {
      console.warn('Backend no disponible o error de red, usando respaldo local...', error);
      
      // Respaldo de seguridad offline para demostraciones rápidas
      if (formData.name && formData.email && formData.password.length >= 4) {
        handleRegisterSuccess();
      } else {
        setErrorMessage('Por favor, completa todos los campos correctamente (Contraseña mínima de 4 caracteres).');
        setLoading(false);
      }
    }
  };

  const handleRegisterSuccess = () => {
    setSuccessMessage(true);
    
    // Guardamos la sesión y aseguramos que el rol de organizador quede grabado
    localStorage.setItem('codeCraftersUser', JSON.stringify({ 
      name: formData.name, 
      email: formData.email, 
      role: role,
      loggedIn: true 
    }));
    localStorage.setItem('userRole', role);

    // Redirigimos al panel de organización tras un breve instante
    setTimeout(() => {
      navigate('/organizer/dashboard');
    }, 1500);
  };

  return (
    <main className="register-page" style={{ background: '#0b1120', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', boxSizing: 'border-box', color: '#fff' }}>
      <div style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '12px', border: '1px solid #334155', maxWidth: '420px', width: '100%', boxSizing: 'border-box' }}>
        
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', marginBottom: '1.5rem', padding: 0, fontSize: '0.9rem', fontWeight: '500' }}
        >
          ← Volver al inicio
        </button>

        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem', fontWeight: 'bold', color: '#fff' }}>Registro de Organizador</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>Regístrate para administrar la infraestructura y crear eventos en Code Crafters.</p>

        {errorMessage && (
          <p style={{ background: '#7f1d1d', color: '#fca5a5', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'center', margin: '0 0 1rem 0' }}>
            {errorMessage}
          </p>
        )}

        {successMessage ? (
          <p style={{ background: '#065f46', color: '#ecfdf5', padding: '1rem', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', margin: '0 0 1rem 0' }}>
            ¡Organizador registrado con éxito! Redirigiendo al panel... 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label htmlFor="registerName" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#cbd5e1', fontWeight: '500' }}>
                Nombre u Organización
              </label>
              <input 
                id="registerName"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box', fontSize: '0.95rem' }}
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="registerEmail" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#cbd5e1', fontWeight: '500' }}>
                Correo electrónico
              </label>
              <input 
                id="registerEmail"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box', fontSize: '0.95rem' }}
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="registerPassword" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#cbd5e1', fontWeight: '500' }}>
                Contraseña
              </label>
              <input 
                id="registerPassword"
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box', fontSize: '0.95rem' }}
                placeholder="••••••••"
              />
            </div>

            <button 
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              style={{ background: '#06b6d4', color: '#0f172a', border: 'none', padding: '0.85rem', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem', opacity: loading ? 0.7 : 1, fontSize: '0.95rem', transition: 'background 0.2s' }}
            >
              {loading ? 'Registrando...' : 'Registrarse como Organizador'}
            </button>
          </form>
        )}

      </div>
    </main>
  );
};

export default Register;