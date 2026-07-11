import React, { useState, useRef, useEffect } from 'react';
import { useGeminiAgent } from '../../context/GeminiAgentContext';

export function IAAgentPanel() {
  const { isOpen, toggleAgent, messages, sendMessage, isLoading } = useGeminiAgent();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll al fondo del chat cuando hay un mensaje nuevo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <>
      {/* Fondo oscuro traslúcido (Backdrop) */}
      {isOpen && (
        <div 
          onClick={toggleAgent}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Contenedor del Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabecera del Panel */}
        <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-950/50 border border-emerald-800/50 rounded-lg text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0a.75.75 0 1 1-.987 1.129ZM9.75 10.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm6.75.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5ZM9 16.5c0-.414.336-.75.75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 9 16.5Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">BaseCamp AI</h2>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                Guía de expedición en línea
              </p>
            </div>
          </div>
          
          <button 
            onClick={toggleAgent}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Zona de Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div 
                className={`p-3 rounded-xl text-sm whitespace-pre-line leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 px-1">
                {msg.sender === 'user' ? 'Tú' : 'BaseCamp'}
              </span>
            </div>
          ))}

          {/* Indicador de carga / Pensando */}
          {isLoading && (
            <div className="flex flex-col items-start max-w-[85%] mr-auto">
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl rounded-tl-none flex items-center gap-1.5">
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Formulario de Entrada */}
        <form onSubmit={handleSubmit} className="p-4 bg-zinc-900/30 border-t border-zinc-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder="Pregúntame sobre carpas, trekking, escalada..."
              className="flex-1 bg-black border border-zinc-800 text-white rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed placeholder-zinc-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}