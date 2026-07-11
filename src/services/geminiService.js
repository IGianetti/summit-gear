/**
 * Servicio de conexión con la API de Gemini de Google.
 * Implementa una estrategia resiliente de reintentos con retroceso exponencial
 * para resolver problemas temporales de conexión o límites de tarifa.
 */
export async function callGeminiAPI(userPrompt, systemInstruction, retries = 5, delay = 1000) {
  // En producción, el entorno inyecta la API Key. Inicialmente se define vacía.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (aiResponse) {
        return aiResponse;
      }
      throw new Error("La respuesta recibida no tiene el formato esperado.");
    } catch (error) {
      // Si es el último intento fallido, propagamos el error definitivo
      if (i === retries - 1) {
        throw error;
      }
      // Retroceso exponencial: espera incrementada en cada fallo (1s, 2s, 4s, 8s, 16s)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
}