export type CartItem = { name: string; price: number; image: string; quantity: number };

export function addItem(items: CartItem[], product: Omit<CartItem, "quantity">): CartItem[] {
  const existing = items.find((i) => i.name === product.name);
  if (existing) {
    return items.map((i) => (i.name === product.name ? { ...i, quantity: i.quantity + 1 } : i));
  }
  return [...items, { ...product, quantity: 1 }];
}

export function changeQuantity(items: CartItem[], name: string, delta: number): CartItem[] {
  return items
    .map((i) => (i.name === name ? { ...i, quantity: i.quantity + delta } : i))
    .filter((i) => i.quantity > 0);
}

export function removeItem(items: CartItem[], name: string): CartItem[] {
  return items.filter((i) => i.name !== name);
}

export function cartTotal(items: CartItem[]): number {
  return Math.round(items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100) / 100;
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
