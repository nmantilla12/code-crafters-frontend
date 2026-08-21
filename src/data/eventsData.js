// src/data/eventsData.js
export const eventsData = [
  {
    id: "1",
    title: "Arquitectura y Flujo de Sistemas",
    category: "Conferencia Técnica",
    date: "15-16 Octubre, 2026",
    location: "Tech Hub, Madrid",
    description: "Únete a nosotros para una exploración profunda de los flujos de usuarios, arquitectura de sistemas y diseño de interfaces avanzadas. Analizaremos casos de estudio reales, incluyendo la optimización del panel de control para organizadores y la implementación de dashboards de alto rendimiento.",
    agenda: [
      {
        day: "Día 1: Fundamentos",
        date: "Oct 15",
        sessions: [
          { time: "09:00", title: "Análisis del 'Inicio'", desc: "Desglosando el primer punto de contacto." },
          { time: "11:30", title: "Arquitectura de Dashboards", desc: "Patrones de diseño para visualización de datos masivos." }
        ]
      },
      {
        day: "Día 2: Avanzado",
        date: "Oct 16",
        sessions: [
          { time: "10:00", title: "Integración del Panel de Control", desc: "Conectando el dashboard con herramientas administrativas." },
          { time: "14:00", title: "Soporte y Resiliencia", desc: "Flujos de contacto y manejo de errores a escala." }
        ]
      }
    ],
    speakers: [
      { initials: "ER", name: "Elena R.", role: "Lead Architect" },
      { initials: "CM", name: "Carlos M.", role: "UX/UI Lead" }
    ],
    faqs: [
      {
        q: "¿Cómo puedo registrarme o inscribirme a este evento?",
        a: "Puedes rellenar el formulario lateral seleccionando tu tipo de entrada, completando tus datos y aceptando los términos."
      },
      {
        q: "¿Qué incluye mi entrada a Code Crafters?",
        a: "Acceso completo a todas las ponencias de la agenda técnica, networking y material exclusivo del evento."
      },
      {
        q: "¿A quién debo contactar si tengo problemas técnicos?",
        a: "Puedes escribirnos directamente a nuestro equipo de ayuda en soporte@codecrafters.com y te responderemos lo antes posible."
      }
    ]
  },
  {
    id: "2",
    title: "Innovación en React y Componentes Modernos",
    category: "Taller Práctico",
    date: "20 Noviembre, 2026",
    location: "Online / Streaming",
    description: "Un taller totalmente enfocado en buenas prácticas de desarrollo frontend, optimización de hooks, manejo de estados complejos y renderizado eficiente en aplicaciones web de gran escala.",
    agenda: [
      {
        day: "Jornada Única",
        date: "Nov 20",
        sessions: [
          { time: "10:00", title: "Optimización de Hooks", desc: "Evitando re-renderizados innecesarios." },
          { time: "16:00", title: "Arquitectura Modular", desc: "Organización de carpetas y componentes escalables." }
        ]
      }
    ],
    speakers: [
      { initials: "NM", name: "Nira M.", role: "Senior Frontend Dev" }
    ],
    faqs: [
      {
        q: "¿Se grabará la sesión online?",
        a: "Sí, todos los inscritos recibirán el enlace con la grabación y los repositorios de código durante las 48 horas posteriores al evento."
      },
      {
        q: "¿Necesito conocimientos previos?",
        a: "Se recomienda tener bases sólidas en JavaScript moderno y React básico."
      }
    ]
  }
];