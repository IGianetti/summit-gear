export function ProductFilterBar({ 
  searchQuery, setSearchQuery, 
  selectedCategory, setSelectedCategory, 
  allCategories, 
  sortBy, setSortBy 
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
      <input 
        type="text" 
        placeholder="Buscar equipo..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-black border border-zinc-700 p-2 rounded w-full md:w-1/3 text-white"
      />
      
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="bg-black border border-zinc-700 p-2 rounded text-white"
      >
        {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <select 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-black border border-zinc-700 p-2 rounded text-white"
      >
        <option value="relevant">Más relevante</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
      </select>
    </div>
  );
}