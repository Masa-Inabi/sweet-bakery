import { createFileRoute } from "@tanstack/react-router";

import aboutImage from "@/assets/about-bakery.jpg";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Sweet Bakery" },
      { name: "description", content: "Meet Sweet Bakery: a small family bakery baking fresh treats with love since 2015." },
      { property: "og:title", content: "About Us — Sweet Bakery" },
      { property: "og:description", content: "A small family bakery baking fresh treats with love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { emoji: "🌾", title: "Real ingredients", text: "Butter, fresh eggs and fruit — never anything artificial." },
  { emoji: "⏰", title: "Baked daily", text: "Everything is made fresh each morning in our kitchen." },
  { emoji: "💗", title: "Made with love", text: "Every treat is handmade by our small, friendly team." },
];

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title="Our sweet story" subtitle="A little bakery with a big love for sugar, butter and smiles." />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <img
          src={aboutImage}
          alt="Our baker arranging fresh pastries in the display case"
          loading="lazy"
          width={1200}
          height={912}
          className="w-full rounded-3xl object-cover shadow-lift"
        />
        <div className="space-y-4 text-lg text-muted-foreground">
          <h2 className="text-3xl font-semibold text-foreground">Baking happiness since 2015</h2>
          <p>
            Sweet Bakery started in a tiny home kitchen with one dream: to share treats that make people smile.
            Today, our cozy pink shop bakes fresh cakes, cupcakes and cookies every morning.
          </p>
          <p>
            Whether you're celebrating a birthday or just need a little pick-me-up, we're here to make your day
            sweeter.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-3xl border bg-card p-6 text-center shadow-soft">
            <div className="text-4xl">{v.emoji}</div>
            <h3 className="mt-3 text-xl font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
