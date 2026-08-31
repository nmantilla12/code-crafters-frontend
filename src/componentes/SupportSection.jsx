import React, { useState } from 'react';
import { LEGAL_LINKS } from '../data/legalLinks';
import SupportForm from '../componentes/SupportForm';

const Support = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo crear y publicar un nuevo evento?",
      answer: "Dirígete a tu panel de control, haz clic en la opción de crear evento y completa el formulario con los detalles requeridos."
    },
    {
      id: 2,
      question: "¿Qué métodos de pago están aceptados?",
      answer: "Actualmente el sistema simula el proceso de inscripción y gestión de pases para los eventos de la plataforma."
    },
    {
      id: 3,
      question: "¿Puedo cancelar o modificar mi asistencia?",
      answer: "Sí, puedes gestionar tus entradas y plazas directamente desde la sección de tus boletos o entradas guardadas."
    },
    {
      id: 4,
      question: "¿Cómo contactar con el soporte técnico?",
      answer: "Puedes rellenar el formulario que encontrarás más abajo en esta misma página o escribirnos a nuestro correo de asistencia."
    }
  ];

  const toggleAccordion = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <div 
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#070a13',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      <section 
        className="support-page-container" 
        style={{ 
          width: '100%',
          maxWidth: '850px', 
          margin: '0 auto',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          boxSizing: 'border-box'
        }}
      >
        {/* Cabecera optimizada */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', boxSizing: 'border-box' }}>
          <h2 
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.25rem)', fontWeight: '800', margin: '0', color: '#ffffff', letterSpacing: '-0.025em' }}
          >
            Soporte y Ayuda
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', fontWeight: '500', lineHeight: '1.5', margin: '0 auto', maxWidth: '650px' }}>
            Encuentra respuestas rápidas o ponte en contacto con nuestro equipo de asistencia técnica.
          </p>
        </div>

        {/* Tarjeta de presentación de FAQs */}
        <div style={{ width: '100%', boxSizing: 'border-box' }}>
          <div 
            style={{ 
              background: '#0f172a', 
              border: '2px solid #334155', 
              borderRadius: '10px', 
              padding: '1.5rem', 
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ fontSize: '1.5rem' }} aria-hidden="true">❓</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0', color: '#f8fafc' }}>
              Preguntas Frecuentes (FAQs)
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: '0 0 0.5rem 0', lineHeight: '1.5' }}>
              Resuelve tus dudas sobre accesos, inscripciones, cambios de sala y funcionamiento general.
            </p>
            <button
              type="button"
              onClick={() => {
                const element = document.getElementById('faqs-container');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                textDecoration: 'underline',
                fontSize: '0.95rem',
                fontWeight: '700',
                padding: 0,
                cursor: 'pointer',
                width: 'fit-content',
                textAlign: 'left'
              }}
            >
              Ver preguntas frecuentes &rarr;
            </button>
          </div>
        </div>

        {/* Acordeón de Preguntas Frecuentes */}
        <div id="faqs-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', boxSizing: 'border-box' }}>
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                style={{ background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={activeIndex === faq.id}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    textAlign: 'left',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <span style={{ flex: 1 }}>{faq.question}</span>
                  <span style={{ color: '#38bdf8', fontSize: '1.3rem', fontWeight: 'bold', flexShrink: '0' }} aria-hidden="true">
                    {activeIndex === faq.id ? '−' : '+'}
                  </span>
                </button>

                {activeIndex === faq.id && (
                  <div 
                    style={{ 
                      padding: '0 1.25rem 1.25rem 1.25rem', 
                      color: '#cbd5e1', 
                      fontSize: '0.92rem', 
                      lineHeight: '1.6', 
                      fontWeight: '400',
                      borderTop: '1px solid #1e293b',
                      paddingTop: '0.75rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de Soporte */}
        <div style={{ width: '100%', boxSizing: 'border-box' }}>
          <SupportForm />
        </div>

        {/* Botones de Navegación Inferior */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '1rem', 
            width: '100%', 
            boxSizing: 'border-box',
            flexWrap: 'wrap'
          }}
        >
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{
              background: '#1e293b',
              color: '#ffffff',
              border: '1px solid #334155',
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              flex: '1 1 120px',
              boxSizing: 'border-box'
            }}
          >
            &larr; Volver
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '#events'}
            style={{
              background: '#0284c7',
              color: '#ffffff',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              flex: '2 1 200px',
              boxSizing: 'border-box'
            }}
          >
            Explorar Eventos &rarr;
          </button>
        </div>

        {/* Enlaces Legales */}
        <footer style={{ textAlign: 'center', borderTop: '2px solid #334155', paddingTop: '1.75rem', width: '100%', boxSizing: 'border-box' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#cbd5e1', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Información Legal
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', listStyle: 'none', padding: 0, margin: 0, gap: '0.75rem', alignItems: 'center', boxSizing: 'border-box' }}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  style={{ color: '#38bdf8', textDecoration: 'underline', fontSize: '0.9rem', fontWeight: '600' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </section>
    </div>
  );
};

export default Support;