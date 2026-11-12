import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fieldErrors, signInSchema } from "@/lib/form-schemas";
import { displayName, useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign In — Sweet Bakery" },
      { name: "description", content: "Sign in to your Sweet Bakery account." },
      { property: "og:title", content: "Sign In — Sweet Bakery" },
      { property: "og:description", content: "Sign in to your Sweet Bakery account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = signInSchema.safeParse(form);
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(result.data);
    setBusy(false);
    if (error) {
      toast.error(
        error.message.toLowerCase().includes("confirm")
          ? "Please confirm your email first — check your inbox."
          : "Wrong email or password. Please try again.",
      );
      return;
    }
    toast.success("Welcome back! 🧁");
    navigate({ to: "/" });
  }

  if (user) {
    return (
      <AuthCard title={`Hi, ${displayName(user)}!`} subtitle="You're already signed in.">
        <Button asChild size="lg" className="w-full">
          <Link to="/">Go to home</Link>
        </Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your Sweet Bakery account">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField id="email" label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors["email"]} autoComplete="email" placeholder="you@example.com" />
        <FormField id="password" label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} error={errors["password"]} autoComplete="current-password" />
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/signup" className="font-bold text-primary hover:underline">Create an account</Link>
      </p>
    </AuthCard>
  );
}
