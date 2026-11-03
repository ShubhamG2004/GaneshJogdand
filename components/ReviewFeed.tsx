"use client";

import { useEffect, useState } from "react";
import { ReviewCard } from "@/components/ReviewCard";
import { Review } from "@/lib/types";

export function ReviewFeed({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews", { cache: "no-store" });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Unable to load reviews.");
        }

        setReviews(result.reviews);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load reviews.");
      } finally {
        setIsLoading(false);
      }
    }

    loadReviews();
  }, []);

  return (
    <div>
      {isLoading ? <p className="mb-4 text-sm text-slate-500">Loading reviews...</p> : null}
      {error ? <p className="mb-4 rounded bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">{error}</p> : null}
      {reviews.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      ) : (
        <p className="rounded border border-slate-200 bg-white p-6 text-slate-600">No reviews have been submitted yet.</p>
      )}
    </div>
  );
}
