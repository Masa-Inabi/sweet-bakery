import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { toast } from "sonner";

import { CartButton } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { displayName, useAuth } from "@/hooks/use-auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/cakes", label: "Cakes" },
  { to: "/cupcakes", label: "Cupcakes" },
  { to: "/cookies", label: "Cookies" },
  { to: "/drinks", label: "Drinks" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    setOpen(false);
    toast.success("You've been logged out. See you soon!");
    navigate({ to: "/signin", replace: true });
  }

  const linkClass =
    "rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-secondary-foreground";
  const activeClass = "bg-secondary text-secondary-foreground";

  const authArea = loading ? null : user ? (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        Hi, <span className="font-bold text-foreground">{displayName(user)}</span>
      </span>
      <Button variant="soft" size="sm" onClick={handleLogout}>
        <LogOut /> Logout
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link to="/signin" onClick={() => setOpen(false)}>
          Sign In
        </Link>
      </Button>
      <Button asChild size="sm">
        <Link to="/signup" onClick={() => setOpen(false)}>
          Sign Up
        </Link>
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-lg text-primary-foreground">
            🧁
          </span>
          <span className="font-display text-xl font-semibold">Sweet Bakery</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeProps={{ className: activeClass }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">{authArea}</div>
          <CartButton />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-background lg:hidden animate-fade-up">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={linkClass}
                activeProps={{ className: activeClass }}
                activeOptions={{ exact: true }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 border-t pt-4">{authArea}</div>
          </nav>
        </div>
      )}
    </header>
  );
}
