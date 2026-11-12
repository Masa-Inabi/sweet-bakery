export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="bg-gradient-blush">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
      </div>
    </section>
  );
}
