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
    <section className="support-section" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <div className="support-section__header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 className="support-section__title" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Soporte y Ayuda</h2>
        <p className="support-section__subtitle" style={{ color: '#94a3b8' }}>
          Encuentra respuestas rápidas, consulta la documentación o ponte en contacto con nosotros.
        </p>
      </div>

      {/* Tarjetas adaptativas con minmax para que bajen automáticamente si la pantalla es estrecha */}
      <div className="support-section__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        <div className="support-card" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem' }}>
          <div className="support-card__icon" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} aria-hidden="true">❓</div>
          <h3 className="support-card__title" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Preguntas Frecuentes (FAQs)</h3>
          <p className="support-card__text" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Resuelve tus dudas sobre accesos, inscripciones, cambios de sala y funcionamiento general.
          </p>
          <a href="#faqs" className="support-card__link" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.85rem' }}>Ver preguntas frecuentes &rarr;</a>
        </div>

        <div className="support-card" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem' }}>
          <div className="support-card__icon" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} aria-hidden="true">📚</div>
          <h3 className="support-card__title" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Documentación</h3>
          <p className="support-card__text" style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Accede a guías detalladas de uso, manuales técnicos y especificaciones de accesibilidad.
          </p>
          <a href="#docs" className="support-card__link" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.85rem' }}>Consultar documentación &rarr;</a>
        </div>
      </div>

      {/* SECCIÓN DE PREGUNTAS FRECUENTES (Acordeón) */}
      <div id="faqs" style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Preguntas Frecuentes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden' }}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{faq.question}</span>
                <span style={{ color: '#38bdf8', fontSize: '1.2rem' }}>
                  {activeIndex === faq.id ? '−' : '+'}
                </span>
              </button>

              {activeIndex === faq.id && (
                <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FORMULARIO DE SOPORTE */}
      <div style={{ marginBottom: '3rem' }}>
        <SupportForm />
      </div>

      {/* ENLACES LEGALES */}
      <footer className="support-section__footer-links" style={{ textAlign: 'center', borderTop: '1px solid #334155', paddingTop: '1.5rem' }}>
        <h4 className="support-section__footer-title" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#94a3b8' }}>Información Legal</h4>
        <ul className="support-space__legal-list" style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0, gap: '0.5rem', flexWrap: 'wrap' }}>
          {LEGAL_LINKS.map((link, index) => (
            <React.Fragment key={link.id}>
              <li>
                <a href={link.href} className="support-section__legal-link" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.85rem' }}>
                  {link.label}
                </a>
              </li>
              {index < LEGAL_LINKS.length - 1 && (
                <li><span className="support-section__separator" style={{ color: '#64748b' }}>•</span></li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </footer>
    </section>
  );
};

export default SupportSection;