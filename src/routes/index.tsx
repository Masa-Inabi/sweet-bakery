import { createFileRoute, Link } from "@tanstack/react-router";

import heroImage from "@/assets/hero-bakery.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { featured } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sweet Bakery — Fresh Cakes, Cupcakes & Cookies" },
      { name: "description", content: "Welcome to Sweet Bakery! Discover our freshly baked cakes, cupcakes, cookies and cozy drinks." },
      { property: "og:title", content: "Sweet Bakery — Fresh Cakes, Cupcakes & Cookies" },
      { property: "og:description", content: "Freshly baked cakes, cupcakes, cookies and cozy drinks, made with love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  { to: "/cakes", emoji: "🎂", label: "Cakes" },
  { to: "/cupcakes", emoji: "🧁", label: "Cupcakes" },
  { to: "/cookies", emoji: "🍪", label: "Cookies" },
  { to: "/drinks", emoji: "🥤", label: "Drinks" },
] as const;

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Pink strawberry cake, macarons and cupcakes on a marble counter"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <div className="max-w-lg animate-fade-up">
            <p className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-secondary-foreground">
              Freshly baked every morning
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Welcome to <span className="text-primary">Sweet Bakery</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Handmade cakes, cupcakes, cookies and cozy drinks — baked with love to make every day a little sweeter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/cakes">See our cakes</Link>
              </Button>
              <Button asChild size="lg" variant="soft">
                <Link to="/contact">Visit us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="flex flex-col items-center gap-2 rounded-3xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:bg-secondary hover:shadow-lift"
            >
              <span className="text-4xl">{c.emoji}</span>
              <span className="font-display text-lg font-semibold">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Customer favorites</p>
          <h2 className="mt-2 text-4xl font-semibold">Featured desserts</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
