import { useState, useMemo } from 'react';
import { PRODUCT_DATABASE, CATEGORIES } from '../data/products';

/**
 * Custom Hook useProducts
 * Encapsula de manera pura toda la lógica de filtrado, búsqueda y ordenamiento de productos.
 */
export function useProducts() {
  const [products] = useState(PRODUCT_DATABASE);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevant'); // 'relevant' | 'price-asc' | 'price-desc'

  // Procesamiento memorizado de productos para evitar recálculos innecesarios en cada re-renderizado
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filtrar por Categoría
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // 2. Filtrar por Búsqueda (Insensible a mayúsculas/minúsculas)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }

    // 3. Aplicar Ordenamiento
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Lista de categorías únicas para la UI
  const allCategories = useMemo(() => {
    return ['All', ...Object.values(CATEGORIES)];
  }, []);

  return {
    products: filteredProducts,
    allCategories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy
  };
}
