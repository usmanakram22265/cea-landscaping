"use server";

import { z } from "zod";

const QuoteSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name."),
    email: z.string().trim().optional().default(""),
    phone: z.string().trim().optional().default(""),
    propertyType: z.string().trim().min(1, "Please choose a property type."),
    services: z
      .array(z.string().trim().min(1))
      .min(1, "Please choose at least one service."),
    message: z.string().trim().max(2000).optional().default(""),
    // honeypot — must stay empty
    company: z.string().max(0).optional().default(""),
  })
  .superRefine((data, ctx) => {
    const hasPhone = data.phone.length > 0;
    const hasEmail = data.email.length > 0;
    if (!hasPhone && !hasEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["contact"],
        message: "Add a phone number or an email so we can reach you.",
      });
    }
    if (hasPhone && (data.phone.length < 7 || data.phone.length > 20)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Please enter a valid phone number.",
      });
    }
    if (hasEmail && !z.string().email().safeParse(data.email).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Please enter a valid email.",
      });
    }
  });

type ErrorKey =
  | "name"
  | "email"
  | "phone"
  | "propertyType"
  | "services"
  | "message"
  | "contact";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ErrorKey, string>>;
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
    services: formData.getAll("services").map(String),
    message: formData.get("message") ?? "",
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    const errors: QuoteState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ErrorKey;
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
  const { name, email, phone, propertyType, services, message } = parsed.data;
  console.log("[CEA quote request]", {
    name,
    email,
    phone,
    propertyType,
    services,
    message,
    at: new Date().toISOString(),
  });

  return {
    status: "success",
    message:
      "Thanks for reaching out. We've received your request and will get back to you shortly.",
  };
}
