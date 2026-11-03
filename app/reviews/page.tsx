import { ReviewForm } from "@/components/ReviewForm";
import { ReviewFeed } from "@/components/ReviewFeed";
import { reviews, doctor } from "@/lib/data";

export const metadata = {
  title: "Patient Reviews",
  description: `Read patient reviews and recovery stories for ${doctor.name}.`
};

export default function ReviewsPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="font-bold text-clinic-teal">Reviews</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-black text-ink">Patient stories that help new patients choose confidently</h1>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ReviewFeed initialReviews={reviews} />
          <ReviewForm />
        </div>
      </section>
    </main>
  );
}
