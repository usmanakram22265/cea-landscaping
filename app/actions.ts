"use server";

import { z } from "zod";

const QuoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number."),
  propertyType: z.string().trim().min(1, "Please choose a property type."),
  service: z.string().trim().min(1, "Please choose a service."),
  message: z.string().trim().max(2000).optional().default(""),
  // honeypot — must stay empty
  company: z.string().max(0).optional().default(""),
});

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof QuoteSchema>, string>>;
};

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  const parsed = QuoteSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    propertyType: formData.get("propertyType") ?? "",
    service: formData.get("service") ?? "",
    message: formData.get("message") ?? "",
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    const errors: QuoteState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof QuoteSchema>;
      if (!errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  // Honeypot tripped — silently accept without processing.
  if (parsed.data.company) {
    return { status: "success", message: "Thanks, we'll be in touch shortly." };
  }

  // TODO: wire to an email/CRM provider (e.g. Resend, a webhook, or DB).
  // For now we log server-side so the lead isn't lost during the demo.
  const { name, email, phone, propertyType, service, message } = parsed.data;
  console.log("[CEA quote request]", {
    name,
    email,
    phone,
    propertyType,
    service,
    message,
    at: new Date().toISOString(),
  });

  return {
    status: "success",
    message:
      "Thanks for reaching out. We've received your request and will get back to you shortly.",
  };
}
