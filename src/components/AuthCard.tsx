import type { ReactNode } from "react";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <section className="bg-gradient-blush px-4 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-md rounded-3xl border bg-card p-8 shadow-lift animate-fade-up">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-secondary text-2xl">🧁</div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
