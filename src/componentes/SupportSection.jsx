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
      question: "¿Qué tipos de perfiles existen en la plataforma?",
      answer: "Puedes participar como Asistente / Usuario registrado para inscribirte a eventos, o como Organizador para crear y gestionar tus propias convocatorias y aforos."
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

      {/* Contenedor principal adaptable para ordenador y móvil */}
      <div className="support-section__content-grid">
        
        {/* Columna / Bloque Izquierdo: Preguntas Frecuentes */}
        <div className="support-section__block">
          <div className="support-section__block-header">
            <span className="support-section__emoji" aria-hidden="true">💡</span>
            <h3 className="support-section__block-title">Preguntas Frecuentes</h3>
          </div>
          <p className="support-section__block-desc">
            Resuelve tus dudas sobre accesos, inscripciones, perfiles y funcionamiento general.
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

        {/* Columna / Bloque Derecho: Formulario de Soporte */}
        <div className="support-section__block">
          <div className="support-section__block-header">
            <span className="support-section__emoji" aria-hidden="true">✉️</span>
            <h3 className="support-section__block-title">Centro de Soporte y Gestión</h3>
          </div>
          <p className="support-section__block-desc">
            Completa el formulario indicando tu perfil. Al enviar, se abrirá tu aplicación de correo.
          </p>
          
          <SupportForm />
        </div>

      </div>

      {/* Footer Legal */}
      <div className="support-section__footer-links">
        <div className="support-section__back-wrapper">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="support-section__back-btn"
          >
            &larr; Volver
          </button>
        </div>

        <h4 className="support-section__footer-title">Información Legal</h4>
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
      </div>

    </div>
  );
};

export default SupportSection;