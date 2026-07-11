import React from 'react';
import { IAAgentPanel } from '../aiAgent/IAAgentPanel';
import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/Footer';

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col">
      {/* El Navbar se renderiza siempre arriba */}
      <Navbar />
      
      {/* Contenedor dinámico donde se inyectará la página actual (ej. HomePage) */}
      <div className="flex-grow">
        {children}
      </div>

      <IAAgentPanel />
      
      {/* El Footer se renderiza siempre abajo */}
      <Footer />
    </div>
  );
}