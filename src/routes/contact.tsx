import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { FormField } from "@/components/FormField";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, fieldErrors } from "@/lib/form-schemas";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Sweet Bakery" },
      { name: "description", content: "Call, visit or send Sweet Bakery a message. Find our phone number and location." },
      { property: "og:title", content: "Contact Us — Sweet Bakery" },
      { property: "og:description", content: "Get in touch with Sweet Bakery for orders and questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const empty = { name: "", email: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }
    setErrors({});
    setForm(empty);
    toast.success(`Thanks, ${result.data.name}! We'll get back to you soon.`);
  }

  return (
    <>
      <PageHeader eyebrow="Contact us" title="We'd love to hear from you" subtitle="Questions, custom cake orders or just want to say hi? Drop us a line." />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-5">
        <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-3xl border bg-card p-6 shadow-soft sm:p-8 lg:col-span-3">
          <h2 className="text-2xl font-semibold">Send a message</h2>
          <FormField id="name" label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors["name"]} autoComplete="name" />
          <FormField id="email" label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors["email"]} autoComplete="email" />
          <div className="space-y-1.5">
            <Label htmlFor="message" className="font-semibold">Message</Label>
            <Textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              aria-invalid={!!errors["message"]}
              className="rounded-xl bg-background"
            />
            {errors["message"] && <p className="text-sm text-destructive">{errors["message"]}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">Send message</Button>
        </form>

        <div className="space-y-4 lg:col-span-2">
          {[
            { icon: Phone, title: "Phone", lines: ["(555) 123-4567"] },
            { icon: MapPin, title: "Location", lines: ["12 Sugar Lane", "Candy Town, CT 10101"] },
            { icon: Clock, title: "Opening hours", lines: ["Every day", "7:00am – 7:00pm"] },
          ].map(({ icon: Icon, title, lines }) => (
            <div key={title} className="flex gap-4 rounded-3xl border bg-card p-6 shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="text-muted-foreground">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
