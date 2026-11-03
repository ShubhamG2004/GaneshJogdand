import { Star } from "lucide-react";
import { Review } from "@/lib/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex gap-1 text-clinic-sun" aria-label={`${review.rating} star rating`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={18} fill={index < review.rating ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="mt-4 text-base leading-7 text-slate-700">"{review.comment}"</p>
      <p className="mt-4 rounded bg-clinic-mint px-3 py-2 text-sm font-semibold text-teal-900">{review.result}</p>
      <p className="mt-4 font-bold text-ink">{review.patientName}</p>
    </article>
  );
}
