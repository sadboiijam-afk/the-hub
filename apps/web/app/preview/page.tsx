"use client";

import { type FormEvent, useMemo, useState } from "react";
import { previewRoles, type PreviewRole } from "@lucid/shared-types";

type FormState = {
  name: string;
  email: string;
  role: PreviewRole | "";
  city: string;
  country: string;
  message: string;
  consentGranted: boolean;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialFormState: FormState = {
  name: "",
  email: "",
  role: "",
  city: "",
  country: "",
  message: "",
  consentGranted: false
};

const roleLabels: Record<PreviewRole, string> = {
  user: "User",
  merchant: "Merchant",
  creator: "Creator",
  developer: "Developer",
  community: "Community"
};

export default function PreviewPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const apiBaseUrl = useMemo(() => process.env.NEXT_PUBLIC_API_BASE_URL, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState({ status: "error", message: "Please fix the highlighted fields before sending." });
      return;
    }

    if (apiBaseUrl === undefined || apiBaseUrl.length === 0) {
      setSubmitState({
        status: "error",
        message: "NEXT_PUBLIC_API_BASE_URL is not configured for this preview environment."
      });
      return;
    }

    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch(`${apiBaseUrl}/preview-requests`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(toPayload(form))
      });

      if (response.status === 409) {
        setSubmitState({
          status: "error",
          message: "This email is already on the preview list. Use another email if you need a separate request."
        });
        return;
      }

      if (!response.ok) {
        setSubmitState({
          status: "error",
          message: "The preview request could not be sent. Check the API URL and try again."
        });
        return;
      }

      setForm(initialFormState);
      setSubmitState({
        status: "success",
        message: "Preview request received. The LUCID team can now review it in the pre-production admin queue."
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "The API is not reachable. Check NEXT_PUBLIC_API_BASE_URL and try again."
      });
    }
  }

  return (
    <main className="preview-shell">
      <section className="preview-hero" aria-labelledby="preview-heading">
        <div className="preview-aurora preview-aurora-one" />
        <div className="preview-aurora preview-aurora-two" />
        <nav className="top-nav" aria-label="Preview navigation">
          <a className="brand" href="/" aria-label="LUCID Hub home">
            <span className="brand-mark" aria-hidden="true">
              <span />
            </span>
            <span>LUCID Hub</span>
          </a>
          <a className="secondary-button preview-back-link" href="/">
            Back to landing
          </a>
        </nav>

        <div className="preview-layout">
          <div className="preview-copy">
            <p>Preview access</p>
            <h1 id="preview-heading">Join the first LUCID Hub review cohort.</h1>
            <span>
              Tell us where you fit into the local trust layer. This is a lightweight intake for the
              pre-production preview, not a payment, wallet, or production account flow.
            </span>
            <div className="preview-trust-strip" aria-label="Preview privacy boundaries">
              <strong>No payment data</strong>
              <strong>No tracking scripts</strong>
              <strong>Consent recorded</strong>
            </div>
          </div>

          <form className="preview-form" onSubmit={handleSubmit} noValidate>
            <div className="form-heading">
              <p>Request preview</p>
              <h2>Access details</h2>
            </div>

            <label className="field">
              <span>Name <small>optional</small></span>
              <input
                autoComplete="name"
                maxLength={120}
                name="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                aria-describedby={fieldErrors.email === undefined ? undefined : "email-error"}
                aria-invalid={fieldErrors.email === undefined ? undefined : true}
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                name="email"
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              {fieldErrors.email === undefined ? null : <em id="email-error">{fieldErrors.email}</em>}
            </label>

            <label className="field">
              <span>Role</span>
              <select
                aria-describedby={fieldErrors.role === undefined ? undefined : "role-error"}
                aria-invalid={fieldErrors.role === undefined ? undefined : true}
                name="role"
                required
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value as PreviewRole | "" })}
              >
                <option value="">Select your role</option>
                {previewRoles.map((role) => (
                  <option key={role} value={role}>
                    {roleLabels[role]}
                  </option>
                ))}
              </select>
              {fieldErrors.role === undefined ? null : <em id="role-error">{fieldErrors.role}</em>}
            </label>

            <div className="form-grid">
              <label className="field">
                <span>City <small>optional</small></span>
                <input
                  autoComplete="address-level2"
                  maxLength={120}
                  name="city"
                  value={form.city}
                  onChange={(event) => setForm({ ...form, city: event.target.value })}
                />
              </label>
              <label className="field">
                <span>Country <small>optional</small></span>
                <input
                  autoComplete="country-name"
                  maxLength={120}
                  name="country"
                  value={form.country}
                  onChange={(event) => setForm({ ...form, country: event.target.value })}
                />
              </label>
            </div>

            <label className="field">
              <span>Interest or message <small>optional</small></span>
              <textarea
                maxLength={1_000}
                name="message"
                rows={5}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
            </label>

            <label className="consent-field">
              <input
                aria-describedby={fieldErrors.consentGranted === undefined ? undefined : "consent-error"}
                aria-invalid={fieldErrors.consentGranted === undefined ? undefined : true}
                checked={form.consentGranted}
                name="consentGranted"
                required
                type="checkbox"
                onChange={(event) => setForm({ ...form, consentGranted: event.target.checked })}
              />
              <span>
                I agree that LUCID Hub may store this preview request and contact me about preview access.
                This lawful-basis assumption is a candidate only and needs legal review.
              </span>
            </label>
            {fieldErrors.consentGranted === undefined ? null : <em id="consent-error">{fieldErrors.consentGranted}</em>}

            <button className="primary-button preview-submit" disabled={submitState.status === "submitting"} type="submit">
              {submitState.status === "submitting" ? "Sending request..." : "Send preview request"}
            </button>

            {submitState.status === "idle" || submitState.status === "submitting" ? null : (
              <p className={`form-status ${submitState.status}`} role="status">
                {submitState.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function validateForm(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  const email = form.email.trim();

  if (email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!previewRoles.includes(form.role as PreviewRole)) {
    errors.role = "Choose the role that best matches your preview request.";
  }

  if (!form.consentGranted) {
    errors.consentGranted = "Consent is required for the preview request.";
  }

  return errors;
}

function toPayload(form: FormState) {
  return {
    email: form.email,
    role: form.role,
    consentGranted: form.consentGranted,
    ...optionalField("name", form.name),
    ...optionalField("city", form.city),
    ...optionalField("country", form.country),
    ...optionalField("message", form.message)
  };
}

function optionalField<Key extends "name" | "city" | "country" | "message">(key: Key, value: string) {
  const trimmed = value.trim();
  return trimmed.length === 0 ? {} : { [key]: trimmed };
}
