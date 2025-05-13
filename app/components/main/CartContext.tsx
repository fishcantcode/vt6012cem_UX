import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  productName: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productName: string, quantity: number) => void;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productName: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productName === productName);
      if (existing) {
        return prev.map(item =>
          item.productName === productName
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { productName, quantity }];
      }
    });
  };

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
