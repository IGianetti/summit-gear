import { useState, useMemo } from 'react';

/**
 * Custom Hook useCart
 * Maneja el estado y las reglas de negocio del carrito de compras.
 * Protege el stock de los productos y emite notificaciones de sistema (Toasts).
 */
export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper para disparar notificaciones temporales autolimpiables
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  /**
   * Agrega un producto al carrito controlando el stock disponible.
   */
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        
        // Regla de negocio: No superar el stock real del producto
        if (newQty > product.stock) {
          showToast(`¡Uups! Solo quedan ${product.stock} unidades de este artículo.`);
          return prevItems;
        }
        
        showToast(`Agregaste más ${product.name} al carrito.`);
        return prevItems.map(item => 
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      
      if (quantity > product.stock) {
        showToast(`Disculpa, solo disponemos de ${product.stock} unidades.`);
        return prevItems;
      }

      showToast(`¡${product.name} agregado con éxito!`);
      return [...prevItems, { product, quantity }];
    });
  };

  /**
   * Actualiza la cantidad de un artículo existente en el carrito.
   */
  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId) {
          if (newQty > item.product.stock) {
            showToast(`Límite de stock alcanzado (${item.product.stock} u.)`);
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  /**
   * Remueve un producto del carrito por completo.
   */
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.product.id === productId);
      if (item) {
        showToast(`Removiste ${item.product.name} del carrito.`);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  /**
   * Limpia todos los artículos de la sesión.
   */
  const clearCart = () => {
    setCartItems([]);
    showToast("Carrito vaciado correctamente.");
  };

  // Cálculo memorizado del valor total de la compra
  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  // Cálculo memorizado del total de unidades acumuladas en el carrito
  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    totalItemsCount,
    toastMessage
  };
}