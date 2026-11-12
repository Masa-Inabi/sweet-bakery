import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { addItem, changeQuantity, removeItem, type CartItem } from "@/lib/cart";
import type { Product } from "@/lib/products";

const STORAGE_KEY = "sweet-bakery-cart";

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product) => void;
  increase: (name: string) => void;
  decrease: (name: string) => void;
  remove: (name: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Read the saved cart after the page loads in the browser.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      // ignore a broken saved cart
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const value: CartState = {
    items,
    open,
    setOpen,
    add: (p) => setItems((cur) => addItem(cur, { name: p.name, price: p.price, image: p.image })),
    increase: (name) => setItems((cur) => changeQuantity(cur, name, 1)),
    decrease: (name) => setItems((cur) => changeQuantity(cur, name, -1)),
    remove: (name) => setItems((cur) => removeItem(cur, name)),
    clear: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
