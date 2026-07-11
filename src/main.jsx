import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GeminiAgentProvider } from './context/GeminiAgentContext';
import App from './App';
import './index.css'; // Tus estilos globales de Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <GeminiAgentProvider>
      <App />
      </GeminiAgentProvider>
    </Router>
  </React.StrictMode>
);
