'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

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
  isLoading: boolean;
  addToCart: (item: CartItem) => void;
  updateCartItem: (item: CartItem) => void;
  removeItemCart: (id: string) => void;
  removeAllItemsCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        try {
          setCart(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse cart from localStorage', error);
          setCart([]);
        }
      }
      setIsLoading(false);
    };
    loadCart();
  }, []);

  const persistCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  };

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart, item];
    persistCart(updatedCart);
  };

  const updateCartItem = (item: CartItem) => {
    const index = cart.findIndex((i) => i.id === item.id);
    const newCart = [...cart];
    newCart[index] = item;
    persistCart(newCart);
  };

  const removeItemCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    persistCart(newCart);
  };

  const removeAllItemsCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
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
