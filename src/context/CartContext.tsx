'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: string;
  rooms: string;
  maxPersons?: number;
  minPersons?: number;
  roomsDetails: { adults?: string; children?: { dateOfBirth: string }[] }[];
  orderComments?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (item: CartItem) => void;
  removeItemCart: (id: string) => void;
  removeAllItemsCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const updateCartItem = (item: CartItem) => {
    const index = cart.findIndex((i) => i.id === item.id);
    const newCart = [...cart];
    newCart[index] = item;
    setCart(newCart);
  };

  const removeItemCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const removeAllItemsCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        removeAllItemsCart,
        removeItemCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
