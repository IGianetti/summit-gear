import React from 'react';
import { Mountain, Star } from 'lucide-react';


export const ProductCard = ({ product }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
    <div className="h-48 bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
       <Mountain className="h-20 w-20 text-zinc-700" />
    </div>
    <h3 className="font-bold text-lg text-zinc-100">{product.name}</h3>
    <div className="flex items-center gap-1 mb-3">
        {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-emerald-500 text-emerald-500" />)}
    </div>
    <p className="text-emerald-500 font-bold">${product.price}</p>
  </div>
);