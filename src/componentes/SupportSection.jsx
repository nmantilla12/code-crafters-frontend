import React, { useState } from 'react';
import { LEGAL_LINKS } from '../data/legalLinks';
import SupportForm from './SupportForm';

const SupportSection = () => {
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
    <section 
      className="support-section" 
      style={{ 
        padding: '2.5rem 1rem', 
        maxWidth: '850px', 
        margin: '0 auto', 
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Cabecera optimizada con contraste AAA */}
      <div className="support-section__header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h2 
          className="support-section__title" 
          style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '-0.025em' }}
        >
          Soporte y Ayuda
        </h2>
        <p className="support-section__subtitle" style={{ color: '#cbd5e1', fontSize: '1.05rem', fontWeight: '500', lineHeight: '1.5' }}>
          Encuentra respuestas rápidas o ponte en contacto con nuestro equipo de asistencia técnica.
        </p>
      </div>

      {/* Tarjeta de presentación de FAQs */}
      <div className="support-section__grid" style={{ marginBottom: '3rem' }}>
        <div 
          className="support-card" 
          style={{ 
            background: '#0f172a', 
            border: '2px solid #334155', 
            borderRadius: '10px', 
            padding: '1.75rem', 
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div className="support-card__icon" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }} aria-hidden="true">❓</div>
          <h3 className="support-card__title" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: '#f8fafc' }}>
            Preguntas Frecuentes (FAQs)
          </h3>
          <p className="support-card__text" style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>
            Resuelve tus dudas sobre accesos, inscripciones, cambios de sala y funcionamiento general.
          </p>
          <a 
            href="#faqs-container" 
            className="support-card__link" 
            style={{ color: '#38bdf8', textDecoration: 'underline', fontSize: '0.95rem', fontWeight: '700' }}
          >
            Ver preguntas frecuentes &rarr;
          </a>
        </div>
      </div>

      {/* SECCIÓN DE PREGUNTAS FRECUENTES (Acordeón accesible y responsive) */}
      <div id="faqs-container" style={{ marginBottom: '3.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#f8fafc' }}>
          Preguntas Frecuentes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              style={{ background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', overflow: 'hidden' }}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={activeIndex === faq.id}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  textAlign: 'left',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  boxSizing: 'border-box'
                }}
              >
                <span>{faq.question}</span>
                <span style={{ color: '#38bdf8', fontSize: '1.4rem', fontWeight: 'bold', flexShrink: '0' }} aria-hidden="true">
                  {activeIndex === faq.id ? '−' : '+'}
                </span>
              </button>

              {activeIndex === faq.id && (
                <div 
                  style={{ 
                    padding: '0 1.5rem 1.5rem 1.5rem', 
                    color: '#cbd5e1', 
                    fontSize: '0.95rem', 
                    lineHeight: '1.6', 
                    fontWeight: '400',
                    borderTop: '1px solid #1e293b',
                    paddingTop: '1rem'
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FORMULARIO DE SOPORTE */}
      <div style={{ marginBottom: '3.5rem' }}>
        <SupportForm />
      </div>

      {/* ENLACES LEGALES (Responsive y accesibles) */}
      <footer className="support-section__footer-links" style={{ textAlign: 'center', borderTop: '2px solid #334155', paddingTop: '2rem' }}>
        <h4 className="support-section__footer-title" style={{ fontSize: '1rem', marginBottom: '1rem', color: '#cbd5e1', fontWeight: '700' }}>
          Información Legal
        </h4>
        <ul className="support-space__legal-list" style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0, gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {LEGAL_LINKS.map((link, index) => (
            <React.Fragment key={link.id}>
              <li>
                <a 
                  href={link.href} 
                  className="support-section__legal-link" 
                  style={{ color: '#38bdf8', textDecoration: 'underline', fontSize: '0.9rem', fontWeight: '600' }}
                >
                  {link.label}
                </a>
              </li>
              {index < LEGAL_LINKS.length - 1 && (
                <li><span className="support-section__separator" style={{ color: '#94a3b8', fontWeight: 'bold' }} aria-hidden="true">•</span></li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </footer>
    </section>
  );
};

export default SupportSection;