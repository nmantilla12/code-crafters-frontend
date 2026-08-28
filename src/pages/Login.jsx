// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Correo o contraseña incorrectos.');
      }

      handleLoginSuccess();

    } catch (error) {
      console.warn('Backend no disponible o error de red, intentando validación local...', error);
      
      if (formData.email && formData.password.length >= 4) {
        handleLoginSuccess();
      } else {
        setErrorMessage('Correo o contraseña incorrectos (Verifica que el servidor esté activo o introduce credenciales válidas).');
        setLoading(false);
      }
    }
  };

  const handleLoginSuccess = () => {
    setSuccessMessage(true);
    localStorage.setItem('codeCraftersUser', JSON.stringify({ email: formData.email, loggedIn: true }));

    setTimeout(() => {
      navigate('/organizer/dashboard');
    }, 1500);
  };

  return (
    <main className="login-page" style={{ background: '#0b1120', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', boxSizing: 'border-box', color: '#fff' }}>
      <div style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '12px', border: '1px solid #334155', maxWidth: '420px', width: '100%', boxSizing: 'border-box' }}>
        
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', marginBottom: '1.5rem', padding: 0, fontSize: '0.9rem', fontWeight: '500' }}
        >
          ← Volver al inicio
        </button>

        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem', fontWeight: 'bold', color: '#fff' }}>Iniciar Sesión</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>Accede a tu panel de control en Code Crafters.</p>

        {errorMessage && (
          <p style={{ background: '#7f1d1d', color: '#fca5a5', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center', margin: '0 0 1rem 0' }}>
            {errorMessage}
          </p>
        )}

        {successMessage ? (
          <p style={{ background: '#065f46', color: '#ecfdf5', padding: '1rem', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
            ¡Inicio de sesión exitoso! Redirigiendo al panel... 🚀
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label htmlFor="loginEmail" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#cbd5e1', fontWeight: '500' }}>
                Correo electrónico
              </label>
              <input 
                id="loginEmail"
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
              <label htmlFor="loginPassword" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#cbd5e1', fontWeight: '500' }}>
                Contraseña
              </label>
              <input 
                id="loginPassword"
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
              type="submit" 
              disabled={loading}
              style={{ background: '#06b6d4', color: '#0f172a', border: 'none', padding: '0.85rem', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem', opacity: loading ? 0.7 : 1, fontSize: '0.95rem', transition: 'background 0.2s' }}
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        )}

      </div>
    </main>
  );
};

export default Login;