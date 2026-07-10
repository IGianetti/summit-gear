import React from 'react';
import { useProducts } from './hooks/useProducts';

export default function App() {
  const { products, searchQuery, setSearchQuery } = useProducts();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-black text-emerald-400 mb-6">Summit Gear - Test de Compilación</h1>
      
      {/* Input de Prueba */}
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Prueba buscando 'bota' o 'carpa'..."
        className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl mb-6 text-sm text-white focus:outline-none focus:border-emerald-500"
      />

      {/* Lista de productos filtrados */}
      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="font-bold">{p.name}</p>
            <p className="text-xs text-zinc-400">{p.description}</p>
            <p className="text-emerald-400 text-sm font-semibold">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}