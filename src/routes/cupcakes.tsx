import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductCard";
import { cupcakes } from "@/lib/products";

export const Route = createFileRoute("/cupcakes")({
  head: () => ({
    meta: [
      { title: "Cupcakes — Sweet Bakery" },
      { name: "description", content: "Vanilla sprinkle, red velvet and chocolate raspberry cupcakes from Sweet Bakery." },
      { property: "og:title", content: "Cupcakes — Sweet Bakery" },
      { property: "og:description", content: "Cute, fluffy cupcakes with swirls of buttercream." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CupcakesPage,
});

function CupcakesPage() {
  return (
    <>
      <PageHeader eyebrow="Our cupcakes" title="Little bites of joy" subtitle="Fluffy cupcakes topped with big swirls of buttercream. Pick one — or a whole box!" />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <ProductGrid products={cupcakes} />
      </section>
    </>
  );
}
