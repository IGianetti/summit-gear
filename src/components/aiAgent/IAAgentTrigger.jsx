import React from 'react';
import { useGeminiAgent } from '../../context/GeminiAgentContext';

export function IAAgentTrigger() {
  const { toggleAgent } = useGeminiAgent();

  return (
    <button
      onClick={toggleAgent}
      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white hover:border-emerald-500/50 transition-all duration-200 active:scale-95 group"
    >
      {/* Icono de Brújula / Chispa IA */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform duration-300"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L14 15l-5.096.813ZM18.75 9.15l-.463 2.907-.113.71-.71.113-2.907.463 2.907.463.71.113.113.71.463 2.907.463-2.907.113-.71.71-.113 2.907-.463-2.907-.463-.71-.113-.113-.71-.463-2.907Zm-5.25-6.75-.231 1.454-.057.355-.355.057-1.454.231 1.454.231.355.057.057.355.231 1.454.231-1.454.057-.355.355-.057 1.454-.231-1.454-.231-.355-.057-.057-.355-.231-1.454Z" />
      </svg>
      
      <span className="font-medium">BaseCamp AI</span>
      
      {/* Pequeño punto indicador */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    </button>
  );
}