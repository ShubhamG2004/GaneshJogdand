
"use client";

import { useRef, useState } from "react";
import { CalendarCheck, Send } from "lucide-react";

export function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(false);
    setMessage("");
    setIsSubmitting(true);

    try {
      const form = new FormData(event.currentTarget);

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          Object.fromEntries(form.entries())
        ),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to submit appointment."
        );
      }

      formRef.current?.reset();
      setSubmitted(true);

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid gap-4 rounded border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded bg-clinic-mint text-clinic-teal">
          <CalendarCheck size={24} />
        </span>

        <div>
          <h2 className="text-xl font-bold text-ink">
            Request a Home Visit
          </h2>

          <p className="text-sm text-slate-500">
            Share your details and the care you're looking for.
          </p>
        </div>
      </div>

      {/* Name */}
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Name
        <input
          name="name"
          required
          maxLength={100}
          className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal"
          placeholder="Patient name"
        />
      </label>

      {/* Email */}
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Email
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal"
          placeholder="yourname@gmail.com"
        />
      </label>

      {/* Phone */}
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Phone
        <input
          type="tel"
          name="phone"
          required
          maxLength={30}
          className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal"
          placeholder="+91 9087654321"
        />
      </label>

      {/* Service */}
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        What do you need help with?

        <select
          name="service"
          required
          className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal"
        >
          <option>Back or neck pain</option>
          <option>Knee or shoulder rehabilitation</option>
          <option>Neurological rehabilitation</option>
          <option>Post-surgery recovery</option>
          <option>Dry needling or cupping enquiry</option>
          <option>Other physiotherapy support</option>
        </select>
      </label>

      {/* Message */}
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Message

        <textarea
          name="message"
          required
          maxLength={3000}
          className="focus-ring min-h-28 rounded border border-slate-300 px-3 py-3 font-normal"
          placeholder="Your Pune area, preferred visit time, and a brief note"
        />
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-clinic-blue px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={18} />

        {isSubmitting ? "Sending..." : "Send Request"}
      </button>

      {submitted && (
        <p className="rounded bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
          Appointment request submitted successfully!
          The clinic will contact you soon.
        </p>
      )}

      {message && (
        <p className="rounded bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}
    </form>
  );
}
