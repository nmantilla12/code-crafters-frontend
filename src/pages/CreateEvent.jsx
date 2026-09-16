import React from 'react';
import CreateEventForm from '../componentes/CreateEventForm';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import '../styles/organizer-pages.scss'; // O la ruta de tus estilos

const CreateEvent = () => {
  return (
    <div className="create-event-page">
      <Navbar />
      <main className="create-event-main-container">
        <CreateEventForm />
      </main>
      <Footer />
    </div>
  );
};

export default CreateEvent;