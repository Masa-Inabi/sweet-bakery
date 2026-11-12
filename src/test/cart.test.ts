import { describe, expect, it } from "vitest";

import { addItem, cartCount, cartTotal, changeQuantity, removeItem, type CartItem } from "@/lib/cart";

const cake = { name: "Strawberry Dream Cake", price: 32, image: "" };
const cupcake = { name: "Vanilla Sprinkle", price: 3.5, image: "" };

describe("shopping cart", () => {
  it("adding the same product twice increases its quantity", () => {
    const items = addItem(addItem([], cake), cake);
    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(2);
  });

  it("decreasing to zero removes the product", () => {
    const items: CartItem[] = [{ ...cupcake, quantity: 1 }];
    expect(changeQuantity(items, cupcake.name, -1)).toEqual([]);
  });

  it("remove deletes the product", () => {
    const items: CartItem[] = [{ ...cake, quantity: 3 }, { ...cupcake, quantity: 1 }];
    expect(removeItem(items, cake.name).map((i) => i.name)).toEqual([cupcake.name]);
  });

  it("total is price times quantity summed", () => {
    const items: CartItem[] = [{ ...cake, quantity: 2 }, { ...cupcake, quantity: 3 }];
    expect(cartTotal(items)).toBe(74.5);
    expect(cartCount(items)).toBe(5);
  });
});
