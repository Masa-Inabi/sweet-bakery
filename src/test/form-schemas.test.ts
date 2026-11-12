import { describe, expect, it } from "vitest";

import { signUpSchema } from "@/lib/form-schemas";

const base = { name: "Jane", email: "jane@example.com", password: "secret12", confirmPassword: "secret12" };

describe("sign up form", () => {
  it("accepts matching passwords", () => {
    expect(signUpSchema.safeParse(base).success).toBe(true);
  });

  it("rejects when confirm password does not match", () => {
    const r = signUpSchema.safeParse({ ...base, confirmPassword: "different" });
    expect(r.success).toBe(false);
  });

  it("requires a name", () => {
    expect(signUpSchema.safeParse({ ...base, name: "  " }).success).toBe(false);
  });
});
