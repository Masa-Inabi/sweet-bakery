import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { cartCount, cartTotal } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export function CartButton() {
  const { items, setOpen } = useCart();
  const count = cartCount(items);
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
      onClick={() => setOpen(true)}
    >
      <ShoppingBag className="!size-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
          {count}
        </span>
      )}
    </Button>
  );
}

export function CartDrawer() {
  const { items, open, setOpen, increase, decrease, remove, clear } = useCart();
  const total = cartTotal(items);

  function handleCheckout() {
    clear();
    setOpen(false);
    toast.success("Order placed! 🎉 Please pay when you pick it up at the bakery.");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="font-display text-2xl">Your cart</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? "Your cart is empty." : `${cartCount(items)} item${cartCount(items) === 1 ? "" : "s"} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="text-5xl">🧁</span>
            <p className="text-muted-foreground">Nothing here yet — add some treats!</p>
            <Button variant="soft" onClick={() => setOpen(false)}>Keep shopping</Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto p-6">
              {items.map((item) => (
                <li key={item.name} className="flex gap-4 rounded-2xl border bg-card p-3 shadow-soft">
                  <img src={item.image} alt={item.name} width={80} height={80} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display font-semibold leading-tight">{item.name}</p>
                      <button
                        type="button"
                        onClick={() => remove(item.name)}
                        aria-label={`Remove ${item.name}`}
                        className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                        <button
                          type="button"
                          onClick={() => decrease(item.name)}
                          aria-label={`Decrease ${item.name}`}
                          className="grid h-7 w-7 place-items-center rounded-full bg-card text-secondary-foreground transition-colors hover:bg-blush"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increase(item.name)}
                          aria-label={`Increase ${item.name}`}
                          className="grid h-7 w-7 place-items-center rounded-full bg-card text-secondary-foreground transition-colors hover:bg-blush"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t bg-cream p-6">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-display text-2xl font-semibold" data-testid="cart-total">{formatPrice(total)}</span>
              </div>
              <Button size="lg" className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
              <p className="text-center text-xs text-muted-foreground">Pay in store when you pick up your order.</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
