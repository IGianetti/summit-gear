import React from 'react';
import { ShoppingCart, Mountain } from 'lucide-react';

export const Navbar = ({ onTabChange }) => (
  <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <Mountain className="text-emerald-500 h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-white">SUMMIT<span className="text-emerald-500">GEAR</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <button onClick={() => onTabChange('inicio')} className="hover:text-emerald-500 transition-colors">Inicio</button>
          <button onClick={() => onTabChange('tienda')} className="hover:text-emerald-500 transition-colors">Tienda</button>
        </div>
        <button className="relative p-2 hover:bg-zinc-800 rounded-full transition-colors text-white">
          <ShoppingCart className="h-6 w-6" />
        </button>
      </div>
    </div>
  </nav>
);