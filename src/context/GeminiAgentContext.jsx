import React, { createContext, useContext, useState, useCallback } from 'react';
import { callGeminiAPI } from '../services/geminiService';

const GeminiAgentContext = createContext(undefined);

// Instrucción del sistema para darle personalidad de experto en camping/montaña
const SYSTEM_INSTRUCTION = `
Eres "BaseCamp AI", un guía experto en deportes de montaña, escalada, trekking y camping, y el asistente virtual de este e-commerce.
Tu objetivo es ayudar a los usuarios a elegir el equipamiento correcto según sus necesidades (clima, dificultad, tipo de actividad).
Sé entusiasta, profesional, seguro y enfocado en la seguridad al aire libre. 
Si te preguntan por productos, recomiéndales categorías de equipamiento que deberían buscar (ej. carpas de alta montaña, arneses de escalada, indumentaria técnica de tres capas).
Mantén tus respuestas concisas y estructuradas usando viñetas si es necesario.
`;

export function GeminiAgentProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', sender: 'ai', text: '¡Hola, aventurero! Soy BaseCamp AI, tu guía de montaña. ¿Qué expedición estás planeando o qué equipamiento estás buscando hoy?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAgent = useCallback(() => setIsOpen(prev => !prev), []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    // 1. Añadir el mensaje del usuario al chat inmediatamente
    const userMessage = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 2. Construir el prompt incluyendo el contexto reciente para mantener el hilo
      // Para un MVP profesional, unimos los últimos mensajes
      const conversationHistory = messages
        .slice(-6) // Tomamos los últimos mensajes para no saturar el payload básico
        .map(m => `${m.sender === 'ai' ? 'Asistente' : 'Usuario'}: ${m.text}`)
        .join('\n');
      
      const fullPrompt = `${conversationHistory}\nUsuario: ${text}\nAsistente:`;

      // 3. Llamar al servicio
      const aiResponseText = await callGeminiAPI(fullPrompt, SYSTEM_INSTRUCTION);

      // 4. Añadir la respuesta de la IA
      setMessages(prev => [...prev, { id: Date.now().toString() + '-ai', sender: 'ai', text: aiResponseText }]);
    } catch (error) {
      console.error("Error en el Agente de IA:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString() + '-err', 
        sender: 'ai', 
        text: 'Lo siento, perdí la conexión con el campamento base. Por favor, intenta enviarme el mensaje de nuevo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return (
    <GeminiAgentContext.Provider value={{ isOpen, toggleAgent, messages, sendMessage, isLoading }}>
      {children}
    </GeminiAgentContext.Provider>
  );
}

// Custom Hook especializado para consumir el Agente de forma limpia
export function useGeminiAgent() {
  const context = useContext(GeminiAgentContext);
  if (!context) {
    throw new Error('useGeminiAgent debe ser usado dentro de un GeminiAgentProvider');
  }
  return context;
}