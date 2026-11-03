"use client";

import { FormEvent, useState } from "react";
import { MessageSquareQuote, Send } from "lucide-react";

export function ReviewForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setMessage("");
    setIsSubmitting(true);

    try {
      const form = new FormData(formElement);
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries()))
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your review.");
      }

      formElement.reset();
      setMessage("Thank you. Your review has been submitted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit your review.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submitReview} className="grid gap-4 rounded border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded bg-clinic-mint text-clinic-teal">
          <MessageSquareQuote size={24} />
        </span>
        <div>
          <h2 className="text-xl font-black text-ink">Share your experience</h2>
          <p className="text-sm text-slate-500">Tell others how your recovery is going.</p>
        </div>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Your name
        <input name="patientName" required className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal" placeholder="Your name" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Rating
        <select name="rating" required defaultValue="5" className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal">
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Your review
        <textarea name="comment" required className="focus-ring min-h-28 rounded border border-slate-300 px-3 py-3 font-normal" placeholder="What was your experience?" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Recovery result
        <input name="result" required className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal" placeholder="What improved for you?" />
      </label>
      <button disabled={isSubmitting} className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-clinic-blue px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
        <Send size={18} /> {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
      {message ? <p className="rounded bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{message}</p> : null}
    </form>
  );
}
