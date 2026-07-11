import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Renderiza HomePage directamente como el children de MainLayout */}
        <Route path="/" element={<HomePage />} />
        
        <Route 
          path="/productos" 
          element={<div className="p-12 text-center text-zinc-400">Catálogo Completo (Próximamente)</div>} 
        />
      </Routes>
    </MainLayout>
  );
}