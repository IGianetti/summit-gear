import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { HeroSection } from '../components/heroSection/HeroSection';
import { ProductFilterBar } from '../components/productFilterBar/ProductFilterBar';
import { ProductList } from '../components/productList/ProductList';



export default function HomePage() {
  // Extraemos TODO lo que tu hook expone y que el filtro necesita
  const { 
    products, 
    allCategories,
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    sortBy,
    setSortBy
  } = useProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Mantenemos el Hero (el buscador principal) */}
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Pasamos de forma explícita las 7 props que tu ProductFilterBar requiere */}
      <ProductFilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        allCategories={allCategories}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      {/* El grid de productos finales filtrados */}
      <ProductList products={products} />
    </main>
  );
}