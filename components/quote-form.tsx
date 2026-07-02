"use client";

import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  Phone,
  Star,
} from "lucide-react";
import { business, propertyTypes, services, type Service } from "@/lib/content";
import { submitQuote, type QuoteState } from "@/app/actions";
import { Botanical } from "./ui/botanical";
import { Reveal } from "./ui/motion-primitives";

const initialState: QuoteState = { status: "idle" };

const fieldBase =
  "w-full rounded-xl border border-border-strong bg-bg px-4 py-2.5 text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4 focus:ring-brand/15 focus:border-brand";

/**
 * Quote section, sized to fit a single desktop viewport: an image-led navy
 * panel (dusk garden) beside a compact form. Submission runs through the Zod
 * server action in app/actions.ts.
 */
export function QuoteForm() {
  const [state, formAction] = useActionState(submitQuote, initialState);

  return (
    <section
      id="quote"
      className="relative scroll-mt-24 overflow-hidden bg-bg py-12 sm:py-16"
    >
      <Botanical
        src="/images/gen2/botanical-plan.webp"
        className="absolute -right-24 -top-20 w-[22rem] rotate-[8deg] opacity-45 sm:w-[26rem]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-[1.5rem] shadow-float lg:grid-cols-[1fr_1.45fr]">
            {/* image-led contact panel — deep evergreen garden */}
            <div className="relative min-h-[24rem] overflow-hidden bg-evergreen-800 text-white">
              <Image
                src="/images/gen2/quote-garden-green.webp"
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-evergreen-800/90 via-evergreen-800/25 to-evergreen-800/85"
              />

              <div className="relative flex h-full flex-col p-7 sm:p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-sprout/60 motion-reduce:hidden" />
                    <span className="relative inline-flex size-2 rounded-full bg-sprout" />
                  </span>
                  Replies within one business day
                </span>

                <h2 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold leading-[1.08] tracking-tight text-balance text-white">
                  Tell us about your property.
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80 text-pretty">
                  We walk the site before we quote anything, so the number you
                  get is the number it costs.
                </p>

                <div className="mt-auto space-y-3 pt-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className="size-3.5 fill-amber text-amber"
                          strokeWidth={0}
                        />
                      ))}
                    </span>
                    <span className="text-xs text-white/75">
                      5.0 from Houston property teams
                    </span>
                  </div>

                  <a
                    href={business.phoneHref}
                    className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-sm transition-colors duration-300 hover:bg-white/15"
                  >
                    <Phone className="size-4 text-sprout" strokeWidth={2.2} />
                    <span className="font-semibold tabular-nums">
                      {business.phone}
                    </span>
                    <span className="ml-auto text-xs text-white/60">
                      Call or text
                    </span>
                  </a>
                  <a
                    href={business.emailHref}
                    className="group flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-sm transition-colors duration-300 hover:bg-white/15"
                  >
                    <Mail className="size-4 text-sprout" strokeWidth={2.2} />
                    <span className="text-sm font-semibold [overflow-wrap:anywhere]">
                      {business.email}
                    </span>
                  </a>

                  <p className="pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/55">
                    Woman-owned · Licensed &amp; insured · Certified backflow
                  </p>
                </div>
              </div>
            </div>

            {/* compact form card */}
            <div className="bg-surface p-6 sm:p-8">
              {state.status === "success" ? (
                <SuccessPanel message={state.message} />
              ) : (
                <form action={formAction} className="grid gap-4" noValidate>
                  {state.status === "error" && state.message && (
                    <p
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700"
                    >
                      {state.message}
                    </p>
                  )}

                  {/* honeypot */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" error={state.errors?.name}>
                      <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        className={fieldClass(state.errors?.name)}
                      />
                    </Field>
                    <Field
                      label="Property type"
                      error={state.errors?.propertyType}
                    >
                      <Select
                        name="propertyType"
                        error={state.errors?.propertyType}
                        placeholder="Select one"
                        options={[...propertyTypes]}
                      />
                    </Field>
                  </div>

                  <div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Phone" error={state.errors?.phone}>
                        <input
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="(832) 555-0100"
                          className={fieldClass(
                            state.errors?.phone ?? state.errors?.contact
                          )}
                        />
                      </Field>
                      <Field label="Email" error={state.errors?.email}>
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          className={fieldClass(
                            state.errors?.email ?? state.errors?.contact
                          )}
                        />
                      </Field>
                    </div>
                    {state.errors?.contact ? (
                      <p className="mt-1.5 text-sm font-medium text-red-600">
                        {state.errors.contact}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-faint">
                        At least one of phone or email.
                      </p>
                    )}
                  </div>

                  <Field
                    label="Services needed"
                    error={state.errors?.services}
                  >
                    <div className="flex flex-wrap gap-2">
                      {services.map((s: Service) => (
                        <label key={s.id} className="cursor-pointer">
                          <input
                            type="checkbox"
                            name="services"
                            value={s.title}
                            className="peer sr-only"
                          />
                          <span className="inline-flex items-center rounded-full border border-border-strong bg-bg px-3.5 py-2 text-sm font-medium text-muted transition-[background-color,border-color,color,box-shadow] duration-200 hover:border-ink/40 hover:text-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-checked:shadow-soft peer-checked:hover:border-navy-700 peer-checked:hover:bg-navy-700 peer-checked:hover:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
                            {s.title}
                          </span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Project details" optional>
                    <textarea
                      name="message"
                      rows={2}
                      placeholder="Property, timeline, problem areas, what you'd like done…"
                      className={`${fieldBase} resize-none`}
                    />
                  </Field>

                  <div className="mt-1 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <SubmitButton />
                    <p className="text-xs leading-snug text-faint">
                      By submitting, you agree to be contacted
                      <br className="hidden sm:block" /> about your request.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function fieldClass(error?: string) {
  return `${fieldBase} ${
    error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""
  }`;
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
        {label}
        {optional && (
          <span className="text-xs font-normal text-faint">(optional)</span>
        )}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

function Select({
  name,
  options,
  placeholder,
  error,
}: {
  name: string;
  options: string[];
  placeholder: string;
  error?: string;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue=""
        className={`${fieldClass(error)} appearance-none pr-10`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-green transition-[background-color,opacity] duration-300 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Sending…
        </>
      ) : (
        <>
          Request my quote
          <ArrowRight className="size-5 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

function SuccessPanel({ message }: { message?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-10 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-mint text-brand ring-1 ring-brand/15">
        <CheckCircle2 className="size-9" strokeWidth={2} />
      </span>
      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
        Request received
      </h3>
      <p className="mt-3 max-w-sm text-pretty text-muted">{message}</p>
      <a
        href={business.phoneHref}
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-ink transition-colors hover:bg-mint"
      >
        <Phone className="size-4 text-brand" strokeWidth={2.2} />
        Or call {business.phone}
      </a>
    </div>
  );
}
