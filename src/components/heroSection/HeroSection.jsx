import React from 'react';

export function HeroSection({ searchQuery, setSearchQuery }) {
  return (
    <div className="text-center space-y-6 py-12">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-zinc-100">
        Equipamiento para <br/>
        <span className="text-emerald-500">cumbres inolvidables</span>
      </h1>
      <p className="max-w-2xl mx-auto text-zinc-400 text-lg">
        Descubre nuestra selección profesional de elementos para escalada, camping y montañismo. Diseñados por expertos para Summit Gear.
      </p>
      <div className="flex justify-center pt-4">
        <input 
          type="text" 
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg w-full max-w-md text-white focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>
    </div>
  );
}