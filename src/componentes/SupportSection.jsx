// src/componentes/SupportSection.jsx
import React, { useState } from 'react';
import { LEGAL_LINKS } from '../data/legalLinks';
import SupportForm from './SupportForm';

const SupportSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo registrarme o acceder a los eventos?",
      answer: "Explora la cartelera principal, selecciona el evento que te interese y haz clic en inscribirte para asegurar tu plaza y obtener tu código QR de acceso."
    },
    {
      id: 2,
      question: "¿Qué tipos de consultas puedo realizar?",
      answer: "Puedes resolver dudas relacionadas con las inscripciones y accesos a eventos, reportar incidencias técnicas de la plataforma o enviar cualquier otra consulta de carácter general."
    },
    {
      id: 3,
      question: "¿Puedo consultar mis consultas y entradas guardadas?",
      answer: "Sí, todas tus interacciones y formularios de soporte enviados se almacenan de manera local en tu navegador para que puedas consultarlos cuando lo necesites."
    },
    {
      id: 4,
      question: "¿Cómo contactar directamente con el soporte técnico?",
      answer: "Puedes rellenar el formulario de contacto que aparece a continuación o escribirnos directamente a nuestro correo de asistencia."
    }
  ];

  const toggleAccordion = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <div className="support-section">
      
      {/* Cabecera Principal */}
      <div className="support-section__header">
        <h2 className="support-section__title">Soporte y Ayuda</h2>
        <p className="support-section__subtitle">
          Encuentra respuestas rápidas o ponte en contacto con nuestro equipo de asistencia técnica.
        </p>
      </div>

      {/* Contenedor principal adaptable */}
      <div className="support-section__content-grid">
        
        {/* Columna Izquierda: Preguntas Frecuentes */}
        <div className="support-section__block">
          <div className="support-section__block-header">
            <span className="support-section__emoji" aria-hidden="true">💡</span>
            <h3 className="support-section__block-title">Preguntas Frecuentes</h3>
          </div>
          <p className="support-section__block-desc">
            Resuelve tus dudas sobre accesos, inscripciones y funcionamiento general.
          </p>

          <div className="support-accordion">
            {faqs.map((faq) => (
              <div key={faq.id} className="support-accordion__item">
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={activeIndex === faq.id}
                  className="support-accordion__trigger"
                >
                  <span className="support-accordion__question-text">{faq.question}</span>
                  <span className="support-accordion__icon-toggle" aria-hidden="true">
                    {activeIndex === faq.id ? '−' : '+'}
                  </span>
                </button>

                {activeIndex === faq.id && (
                  <div className="support-accordion__content">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Formulario de Soporte */}
        <div className="support-section__block">
          <div className="support-section__block-header">
            <span className="support-section__emoji" aria-hidden="true">✉️</span>
            <h3 className="support-section__block-title">Centro de Soporte y Gestión</h3>
          </div>
          <p className="support-section__block-desc">
            Completa el formulario con tu consulta. Al enviar, se abrirá tu aplicación de correo.
          </p>
          
          <SupportForm />
        </div>

      </div>

      {/* Botón Volver abajo */}
      <div className="support-section__action-bar">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="support-section__back-btn"
        >
          &larr; Volver
        </button>
      </div>

      {/* Footer plano y limpio con los enlaces legales */}
      <footer className="support-section__footer">
        <ul className="support-section__legal-list">
          {LEGAL_LINKS.map((link, index) => (
            <React.Fragment key={link.id}>
              <li className="support-section__legal-item">
                <a href={link.href} className="support-section__legal-link">
                  {link.label}
                </a>
              </li>
              {index < LEGAL_LINKS.length - 1 && (
                <span className="support-section__separator" aria-hidden="true">•</span>
              )}
            </React.Fragment>
          ))}
        </ul>
      </footer>

    </div>
  );
};

export default SupportSection;