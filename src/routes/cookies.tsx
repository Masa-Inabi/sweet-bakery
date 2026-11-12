import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductCard";
import { cookies } from "@/lib/products";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies — Sweet Bakery" },
      { name: "description", content: "Chocolate chip, pink heart sugar cookies and oatmeal raisin cookies with prices." },
      { property: "og:title", content: "Cookies — Sweet Bakery" },
      { property: "og:description", content: "Warm, chewy cookies baked fresh every day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <>
      <PageHeader eyebrow="Our cookies" title="Fresh from the oven" subtitle="Golden, chewy and baked in small batches all day long." />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <ProductGrid products={cookies} />
        <p className="mt-10 rounded-3xl bg-secondary p-6 text-center font-semibold text-secondary-foreground">
          🍪 Sweet deal: buy any 6 cookies and get 1 free!
        </p>
      </section>
    </>
  );
}
