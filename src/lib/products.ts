import cakeStrawberry from "@/assets/cake-strawberry.jpg";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeLemon from "@/assets/cake-lemon.jpg";
import cupcakeVanilla from "@/assets/cupcake-vanilla.jpg";
import cupcakeRedVelvet from "@/assets/cupcake-redvelvet.jpg";
import cupcakeChocolate from "@/assets/cupcake-chocolate.jpg";
import cookieChocChip from "@/assets/cookie-chocolate-chip.jpg";
import cookieSugar from "@/assets/cookie-sugar-heart.jpg";
import cookieOatmeal from "@/assets/cookie-oatmeal.jpg";
import drinkHotChocolate from "@/assets/drink-hot-chocolate.jpg";
import drinkLatte from "@/assets/drink-latte.jpg";
import drinkMilkshake from "@/assets/drink-milkshake.jpg";
import drinkLemonade from "@/assets/drink-lemonade.jpg";

export type Product = {
  name: string;
  description: string;
  price: number;
  unit?: string;
  image: string;
};

export const cakes: Product[] = [
  { name: "Strawberry Dream Cake", description: "Fluffy vanilla layers with fresh strawberries and pink cream.", price: 32, unit: "whole cake", image: cakeStrawberry },
  { name: "Chocolate Fudge Cake", description: "Rich cocoa sponge covered in a glossy chocolate drip.", price: 35, unit: "whole cake", image: cakeChocolate },
  { name: "Lemon Blueberry Cake", description: "Zesty lemon cake bursting with juicy blueberries.", price: 30, unit: "whole cake", image: cakeLemon },
];

export const cupcakes: Product[] = [
  { name: "Vanilla Sprinkle", description: "Classic vanilla with pink buttercream and rainbow sprinkles.", price: 3.5, unit: "each", image: cupcakeVanilla },
  { name: "Red Velvet", description: "Soft red velvet topped with silky cream cheese frosting.", price: 4, unit: "each", image: cupcakeRedVelvet },
  { name: "Chocolate Raspberry", description: "Chocolate cupcake crowned with a fresh raspberry.", price: 4, unit: "each", image: cupcakeChocolate },
];

export const cookies: Product[] = [
  { name: "Chocolate Chip", description: "Golden, chewy and loaded with melty chocolate chunks.", price: 2, unit: "each", image: cookieChocChip },
  { name: "Pink Heart Sugar Cookies", description: "Buttery sugar cookies with sweet pink icing.", price: 2.5, unit: "each", image: cookieSugar },
  { name: "Oatmeal Raisin", description: "Hearty oats, plump raisins and a hint of cinnamon.", price: 2, unit: "each", image: cookieOatmeal },
];

export const hotDrinks: Product[] = [
  { name: "Marshmallow Hot Chocolate", description: "Creamy cocoa with whipped cream and pink marshmallows.", price: 4.5, image: drinkHotChocolate },
  { name: "Heart Latte", description: "Smooth espresso with silky steamed milk.", price: 4, image: drinkLatte },
];

export const coldDrinks: Product[] = [
  { name: "Strawberry Milkshake", description: "Thick, dreamy and topped with whipped cream.", price: 5, image: drinkMilkshake },
  { name: "Pink Lemonade", description: "Fresh, fizzy and perfectly sweet over ice.", price: 3.5, image: drinkLemonade },
];

export const featured: Product[] = [cakes[0]!, cupcakes[0]!, cookies[1]!, coldDrinks[0]!];

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}
