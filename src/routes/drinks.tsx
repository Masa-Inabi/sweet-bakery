import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { coldDrinks, hotDrinks, type Product } from "@/lib/products";

export const Route = createFileRoute("/drinks")({
  head: () => ({
    meta: [
      { title: "Drinks — Sweet Bakery" },
      { name: "description", content: "Hot chocolate, lattes, strawberry milkshakes and pink lemonade at Sweet Bakery." },
      { property: "og:title", content: "Drinks — Sweet Bakery" },
      { property: "og:description", content: "Cozy hot drinks and refreshing cold drinks to pair with your treats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DrinksPage,
});

function DrinkGroup({ title, emoji, items }: { title: string; emoji: string; items: Product[] }) {
  return (
    <div>
      <h2 className="mb-6 flex items-center gap-3 text-3xl font-semibold">
        <span>{emoji}</span> {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </div>
    </div>
  );
}

function DrinksPage() {
  return (
    <>
      <PageHeader eyebrow="Our drinks" title="Sip something sweet" subtitle="Warm up with a cozy mug or cool down with something fruity." />
      <section className="mx-auto grid max-w-6xl gap-14 px-4 py-14 lg:grid-cols-2 lg:gap-10">
        <DrinkGroup title="Hot drinks" emoji="☕" items={hotDrinks} />
        <DrinkGroup title="Cold drinks" emoji="🧊" items={coldDrinks} />
      </section>
    </>
  );
}
