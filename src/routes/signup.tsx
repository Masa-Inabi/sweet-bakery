import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fieldErrors, signUpSchema } from "@/lib/form-schemas";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Sweet Bakery" },
      { name: "description", content: "Create your free Sweet Bakery account." },
      { property: "og:title", content: "Sign Up — Sweet Bakery" },
      { property: "og:description", content: "Create your free Sweet Bakery account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }
    setErrors({});
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: result.data.name },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) {
      toast.success("Account created! Welcome 🧁");
    }
    setSentTo(result.data.email);
  }

  if (sentTo) {
    return (
      <AuthCard title="Check your email 💌" subtitle={`We sent a confirmation link to ${sentTo}.`}>
        <p className="text-center text-sm text-muted-foreground">
          Click the link in that email to finish creating your account, then sign in.
        </p>
        <Button asChild size="lg" className="mt-6 w-full">
          <Link to="/signin">Go to Sign In</Link>
        </Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create an account" subtitle="Join Sweet Bakery — it only takes a minute">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField id="name" label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors["name"]} autoComplete="name" placeholder="Jane Baker" />
        <FormField id="email" label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors["email"]} autoComplete="email" placeholder="you@example.com" />
        <FormField id="password" label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} error={errors["password"]} autoComplete="new-password" />
        <FormField id="confirmPassword" label="Confirm password" type="password" value={form.confirmPassword} onChange={(v) => setForm({ ...form, confirmPassword: v })} error={errors["confirmPassword"]} autoComplete="new-password" />
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/signin" className="font-bold text-primary hover:underline">Sign in</Link>
      </p>
    </AuthCard>
  );
}
