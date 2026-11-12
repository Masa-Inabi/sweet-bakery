import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  password: z.string().min(1, { message: "Please enter your password" }).max(72),
});

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Please enter your name" }).max(100),
    email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(72),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Please enter your name" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  message: z.string().trim().min(1, { message: "Please write a message" }).max(1000),
});

export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
