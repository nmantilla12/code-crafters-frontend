# 🚀 Code Crafters 2026 — Frontend Platform

> Ecosistema unificado para la gestión y exploración de eventos tecnológicos. Proyecto desarrollado en el bootcamp de **Factoría F5**.

---

## 📋 Tabla de contenidos
- [Sobre el proyecto](#sobre-el-proyecto)
- [Pila tecnológica](#pila-tecnológica)
- [Metodología de trabajo y Sprints (Jira & Figma)](#metodología-de-trabajo-y-sprints-jira--figma)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Calidad del Código y Código Limpio (SASS & BEM)](#calidad-del-código-y-código-limpio-sass--bem)
- [Funcionalidades y Control de Acceso (RBAC)](#funcionalidades-y-control-de-acceso-rbac)
- [Instalación y puesta en marcha](#instalación-y-puesta-en-marcha)
- [Autora](#autora)

---

## 🎯 Sobre el proyecto

**Code Crafters 2026** es una aplicación web SPA (*Single Page Application*) desarrollada como parte de la formación en desarrollo full-stack en **Factoría F5**. La plataforma actúa como un ecosistema colaborativo e intuitivo para la gestión, descubrimiento e inscripción en eventos tecnológicos.

El proyecto aborda retos clave de desarrollo frontend moderno: enrutamiento dinámico de vistas, persistencia mediante archivos estructurados y `localStorage`, modularización avanzada de componentes y la integración de flujos ágiles bajo una arquitectura limpia y escalable.

---

## 🛠️ Pila tecnológica

| Tecnología | Uso / Propósito |
| :--- | :--- |
| **React / Vite** | Librería principal de interfaz de usuario y servidor de desarrollo rápido. |
| **React Router** | Enrutamiento dinámico y navegación fluida entre vistas. |
| **SASS (SCSS) + BEM** | Estilado avanzado modular con una arquitectura limpia de clases (*Block__Element--Modifier*). |
| **JavaScript (ES6+)** | Lógica de aplicación, gestión de estados interactivos y controladores. |
| **Spring Boot & PostgreSQL** | Conexión e integración con el backend para la persistencia de datos y gestión de eventos. |
| **localStorage** | Persistencia local complementaria para sesiones, autenticación y estados de usuario. |

---

## 🔄 Metodología de trabajo y Sprints (Jira & Figma)

El ciclo de vida del proyecto se ha gestionado rigurosamente bajo metodologías ágiles y herramientas profesionales:

* **Gestión en Sprints (Jira):** Planificación y seguimiento iterativo mediante tableros ágiles, descomposición de historias de usuario en *subtasks* (ej. rama de trabajo `CODE-49`) y aplicación del Principio de Responsabilidad Única (*Single Responsibility Principle*).
* **Diseño UI/UX (Figma):** Prototipado previo, definición de la paleta de colores corporativos e interactivos, y maquetación de interfaces clave (Landing Page, Panel de Organizador, Catálogo de Eventos, Soporte).
* **Control de Versiones (Git & GitHub):** Trabajo colaborativo mediante un flujo de ramas organizado por *features*, asegurando revisiones de código limpias antes de la integración en la rama principal.

---

## 📁 Estructura del proyecto

```text
src/
├── components/          # Componentes reutilizables e independientes
│   ├── images/          # Recursos gráficos y multimedia del proyecto
│   ├── BottomNav.jsx    # Barra de navegación inferior adaptativa
│   ├── CreateEvent.jsx  # Formulario y lógica de creación de eventos
│   ├── EventItem.jsx    # Tarjeta individual para listar eventos
│   ├── EventList.jsx    # Contenedor y listado de eventos disponibles
│   ├── Footer.jsx       # Pie de página institucional
│   ├── Hero.jsx         # Sección principal de bienvenida (Landing Page)
│   ├── Login.jsx        # Vista y lógica de autenticación de usuarios
│   ├── MetricCard.jsx   # Tarjetas de métricas para el panel de control
│   ├── MyActivities.jsx # Gestión de actividades e inscripciones del usuario
│   ├── Navbar.jsx       # Barra de navegación principal
│   ├── SupportForm.jsx  # Formulario de soporte y buzón de consultas
│   └── TicketQR.jsx     # Generador y visualizador de entradas con código QR
├── context/             # Gestión de estados globales (ej. AuthContext)
├── data/                # Fuentes de datos, mocks y recursos estáticos
│   ├── events.json      # Base de datos en formato JSON para eventos
│   ├── eventsData.js    # Lógica de gestión y estructuración de eventos
│   └── legalLinks.js    # Enlaces y recursos legales centralizados
├── layouts/             # Contenedores de estructura y layouts de página (ej. OrganizerLayout)
├── pages/               # Vistas principales de la aplicación
│   ├── CreateEvent...   # Vista completa de creación de eventos
│   ├── Dashboard.jsx    # Panel principal de control
│   ├── EventDetail.jsx  # Vista detallada de un evento específico
│   ├── ExploreEvents... # Vista de exploración y catálogo de eventos
│   ├── LandingPage.jsx  # Página de bienvenida / Inicio
│   ├── Login.jsx        # Página de inicio de sesión
│   ├── OrganizerDas...  # Dashboard exclusivo para organizadores
│   └── Register.jsx     # Página de registro de nuevos usuarios
├── styles/              # Hojas de estilo modulares en SCSS basadas en BEM
│   ├── _variables.scss  # Variables globales (colores, tipografías, breakpoints)
│   ├── architecture...  # Estilos para la sección de arquitectura
│   ├── bottom-nav.scss  # Estilos BEM para la navegación inferior
│   ├── eventitem.scss   # Estilos BEM para las tarjetas de eventos
│   ├── footer.scss      # Estilos BEM para el pie de página
│   ├── landing.scss     # Estilos BEM para la página de inicio
│   ├── main.scss        # Archivo principal de importación de estilos SCSS
│   ├── navbar.scss      # Estilos BEM para la barra de navegación
│   ├── organizerBuz...  # Estilos para el buzón del organizador
│   └── ...              # Demás módulos de estilos específicos
├── App.jsx              # Componente raíz con la estructura de rutas
├── index.css            # Estilos globales base
└── main.jsx             # Punto de montaje de la aplicación React

🎨 Calidad del Código y Código Limpio (SASS & BEM)
La implementación sigue una separación clara de responsabilidades y buenas prácticas de maquetación:

Arquitectura de Estilos Modular: El estilado se gestiona mediante SASS (SCSS) aplicando estrictamente la metodología BEM (Block, Element, Modifier), centralizando variables y asegurando que cada componente posea su propia hoja de estilos independiente (eventitem.scss, navbar.scss, footer.scss, etc.) para evitar colisiones de clases.

Separación de Lógica y Presentación: Los componentes lógicos gestionan estados y llamadas, mientras que las páginas y vistas se limitan a componer la interfaz de usuario de forma limpia.

Persistencia y Datos Seguros: Procesamiento robusto de datos externos provenientes de archivos JSON y localStorage con comprobaciones previas antes de su renderizado en pantalla.

✨ Funcionalidades y Control de Acceso (RBAC)
Rol Organizador
✅ Crear, editar y eliminar eventos tecnológicos.

✅ Consultar estadísticas dinámicas del Dashboard mediante componentes especializados (MetricCard).

✅ Editar eventos creados y sobrescribir eventos simulados.

✅ Gestionar el catálogo de eventos desde la vista administrativa y revisar el buzón (OrganizerBuzon).

Rol Espectador
✅ Buscar y filtrar eventos por categoría, modalidad, fecha o tecnología.

✅ Ver el detalle completo de un evento específico.

✅ Inscribirse y cancelar inscripción a los eventos de interés.

✅ Ver únicamente sus eventos inscritos en la sección «MIS ACTIVIDADES» (MyActivities) y generar sus entradas con código QR (TicketQR).

✅ Recibir notificaciones de creación, inscripción y cancelación.

Rol Invitado / Visitante
✅ Explorar el contenido público de la plataforma.

✅ Ver los detalles generales de los eventos.

✅ Recibir una interfaz segura con las acciones restringidas bloqueadas.

✅ Acceder directamente al login desde las acciones bloqueadas.

⚙️ Guía de Instalación y Ejecución Local
Si deseas clonar el proyecto y ponerlo en marcha en tu entorno local, sigue estos pasos desde la terminal:

Bash
# 1. Clona el repositorio
git clone [https://github.com/nmantilla12/code-crafters-frontend.git](https://github.com/nmantilla12/code-crafters-frontend.git)

# 2. Entra en la carpeta del proyecto
cd code-crafters-frontend

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
👩‍💻 Autora
Este proyecto ha sido diseñado, maquetado y desarrollado de manera íntegra por:

Nira Mantilla Peña — Desarrolladora Full-Stack Frontend

GitHub: @nmantilla12