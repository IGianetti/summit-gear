export function ProductList({ products }) {
  if (products.length === 0) return <p className="text-center text-zinc-500 py-10">Sin resultados.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-sm text-zinc-400">{product.category}</p>
          <span className="text-xl font-semibold">${product.price}</span>
        </div>
      ))}
    </div>
  );
}