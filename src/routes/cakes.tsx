import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductCard";
import { cakes } from "@/lib/products";

export const Route = createFileRoute("/cakes")({
  head: () => ({
    meta: [
      { title: "Cakes — Sweet Bakery" },
      { name: "description", content: "Strawberry, chocolate fudge and lemon blueberry cakes, baked fresh at Sweet Bakery." },
      { property: "og:title", content: "Cakes — Sweet Bakery" },
      { property: "og:description", content: "Beautiful layer cakes for birthdays, parties and everyday treats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CakesPage,
});

function CakesPage() {
  return (
    <>
      <PageHeader eyebrow="Our cakes" title="Cakes for every celebration" subtitle="Soft layers, dreamy frosting and fresh fruit — perfect for birthdays, parties or just because." />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <ProductGrid products={cakes} />
      </section>
    </>
  );
}
