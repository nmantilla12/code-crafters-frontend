# Code Crafters 2026 - Frontend Platform

Esta plataforma, **Code Crafters 2026**, ha sido diseñada como un ecosistema unificado para la gestión y exploración de eventos tecnológicos. El proyecto se enfoca en ofrecer dos experiencias especializadas: un **Panel de Organizador** para la gestión eficiente y control de datos en tiempo real, y un **Portal de Espectadores** orientado a una experiencia de usuario fluida, desde el descubrimiento hasta la gestión de tickets.

## Arquitectura y Tecnologías
El desarrollo ha priorizado la modularidad, la mantenibilidad y la accesibilidad, implementando las siguientes tecnologías y estándares:

- **Frontend:** React, React Router.
- **Estilos:** SASS (SCSS) con arquitectura BEM para una nomenclatura consistente y reutilizable.
- **Calidad de Código:** Eliminación de estilos en línea, componente centralizado de datos (ej. `legalLinks.js`), y arquitectura de componentes reutilizables (Navbar, Footer, MetricCard, EventItem).
- **Accesibilidad:** Enfoque en estándares WCAG.

## Workflow de Desarrollo
El ciclo de vida del proyecto ha sido gestionado bajo metodologías ágiles, garantizando la trazabilidad entre el diseño, la gestión de tareas y el código:

- **Gestión de Tareas (Jira):** Organización del ciclo de vida del desarrollo, configuración de subtasks, sprints y gestión de flujos de trabajo (Single Responsibility Principle).
- **Diseño (Figma):** Prototipado y estructuración visual de las interfaces: Landing Page, Panel de Organizador, Explorar Eventos, Detalles del Evento, Mis Actividades y Soporte.
- **Código (GitHub):** Repositorio central del frontend donde se gestiona la integración de componentes, el control de versiones y el despliegue del proyecto.

## Guía de Instalación y Ejecución Local
Si deseas clonar el proyecto y ponerlo en marcha en tu entorno local, sigue estos pasos desde la terminal:

```bash
# 1. Clona el repositorio
git clone [https://github.com/nmantilla12/code-crafters-frontend.git](https://github.com/nmantilla12/code-crafters-frontend.git)

# 2. Entra en la carpeta del proyecto
cd code-crafters-frontend

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
