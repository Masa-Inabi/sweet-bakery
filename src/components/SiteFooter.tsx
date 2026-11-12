import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold">🧁 Sweet Bakery</p>
          <p className="mt-2 text-sm text-muted-foreground">Freshly baked happiness, every single day.</p>
        </div>
        <div className="text-sm">
          <p className="font-bold">Visit us</p>
          <p className="mt-2 text-muted-foreground">12 Sugar Lane, Candy Town</p>
          <p className="text-muted-foreground">Open daily 7am – 7pm</p>
        </div>
        <div className="text-sm">
          <p className="font-bold">Say hello</p>
          <p className="mt-2 text-muted-foreground">(555) 123-4567</p>
          <Link to="/contact" className="font-semibold text-primary hover:underline">Send us a message →</Link>
        </div>
      </div>
      <p className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sweet Bakery. Made with love and sprinkles.
      </p>
    </footer>
  );
}
