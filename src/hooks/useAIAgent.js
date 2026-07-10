import { useState } from 'react';
import { callGeminiAPI } from '../services/geminiService';
import { PRODUCT_DATABASE } from '../data/products';

/**
 * Custom Hook useAIAgent
 * Controla el estado del chat con el Agente de IA "Summit Guide".
 * Le provee personalidad técnica y contexto sobre nuestro catálogo de montaña.
 */
export function useAIAgent() {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: '¡Hola, aventurero! 🏔️ Soy tu Guía de Montaña IA de Summit Gear. ¿Estás planeando un campamento, una ruta de escalada o buscando la ropa técnica ideal? Cuéntame tu plan y te aconsejaré las mejores opciones.',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Instrucciones del sistema para definir el comportamiento y dotar de conocimiento sobre los productos
  const systemInstruction = `
    Eres "Summit Guide", un asistente experto en montaña, escalada y equipamiento de camping de la tienda "Summit Gear".
    Tu objetivo es ayudar al usuario de forma muy amigable, técnica y profesional.
    Tienes acceso exclusivo a este catálogo de productos en formato JSON:
    ${JSON.stringify(PRODUCT_DATABASE, null, 2)}
    
    Reglas de comportamiento:
    1. Si el usuario te pregunta por recomendaciones, sugiere productos específicos del catálogo usando su nombre exacto y describe por qué se ajustan a su necesidad.
    2. Mantén un tono aventurero, experto y seguro, alentando el cuidado de la naturaleza y la seguridad en la montaña.
    3. Si el producto que necesita no está en nuestro catálogo, sé honesto y sugiérele alternativas de nuestro catálogo que puedan acercarse, o dale consejos técnicos generales sobre qué buscar.
    4. Responde de forma clara y directa, no estructures respuestas excesivamente largas.
    5. Utiliza emojis pertinentes a la montaña (🧗, ⛺, 🥾, 🏔️, 🌲).
  `;

  /**
   * Envía un mensaje a la IA y actualiza el historial conversacional.
   */
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setErrorMsg(null);

    try {
      const aiReply = await callGeminiAPI(text, systemInstruction);
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: aiReply,
        timestamp: new Date()
      }]);
    } catch (error) {
      setErrorMsg("Ocurrió un pequeño desliz en el sendero de comunicación. Por favor, intenta de nuevo tu consulta.");
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    sendMessage,
    isTyping,
    errorMsg,
    clearChat: () => setMessages([messages[0]])
  };
}