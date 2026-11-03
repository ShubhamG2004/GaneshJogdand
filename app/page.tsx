import Link from "next/link";
import { ArrowRight, Award, CalendarDays, CheckCircle2, MessageCircle, Play, ShieldCheck } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ReviewCard } from "@/components/ReviewCard";
import { VideoCard } from "@/components/VideoCard";
import { doctor, reviews, videos } from "@/lib/data";

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: doctor.name,
    medicalSpecialty: "Physiotherapy",
    description: doctor.about,
    address: {
      "@type": "PostalAddress",
      addressLocality: doctor.city,
      addressRegion: "Maharashtra",
      addressCountry: "IN"
    },
    telephone: doctor.phone,
    url: "https://physiocare.example.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: reviews.length.toString()
    },
    knowsAbout: ["Home visit physiotherapy", "Back pain rehabilitation", "Knee rehabilitation", "Neurological rehabilitation", "Dry needling", "Cupping"]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="medical-grid bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="inline-flex rounded bg-clinic-mint px-3 py-1 text-sm font-bold text-teal-900">Home visits in {doctor.city}</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">
              {doctor.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              Physiotherapy at home for pain, recovery, and better everyday movement. Ask about options such as dry needling and cupping after an assessment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book-appointment" className="focus-ring inline-flex items-center gap-2 rounded bg-clinic-blue px-5 py-4 font-bold text-white hover:bg-blue-700">
                <CalendarDays size={20} /> Book Appointment
              </Link>
              <a href={`https://wa.me/${doctor.whatsapp}`} className="focus-ring inline-flex items-center gap-2 rounded border border-clinic-teal bg-white px-5 py-4 font-bold text-clinic-teal hover:bg-clinic-mint">
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {doctor.achievements.map((achievement) => (
                <div key={achievement} className="flex gap-2 rounded bg-white p-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-clinic-teal" size={18} /> {achievement}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded border border-slate-200 bg-ink shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80"
                alt="Physiotherapist supporting a patient with recovery and mobility"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex items-center justify-between gap-4 bg-white p-5">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Intro video</p>
                  <h2 className="text-xl font-bold text-ink">Home physiotherapy, tailored to you</h2>
                </div>
                <Link href="/videos" className="flex h-12 w-12 items-center justify-center rounded bg-clinic-blue text-white" aria-label="Open video library">
                  <Play size={22} fill="currentColor" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-bold text-clinic-teal">Treatments</p>
              <h2 className="mt-2 text-3xl font-black text-ink">Physiotherapy support at home</h2>
            </div>
            <Link href="/treatments" className="inline-flex items-center gap-2 font-bold text-clinic-blue">View all <ArrowRight size={18} /></Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {["Back and Neck Pain", "Knee Rehabilitation", "Neurological Rehab", "Dry Needling and Cupping"].map((name, index) => (
              <div key={name} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
                {[ShieldCheck, Award, CheckCircle2, CalendarDays].map((Icon, i) => (i === index ? <Icon key={name} className="text-clinic-blue" size={28} /> : null))}
                <h3 className="mt-4 text-xl font-bold text-ink">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Home visits and a care plan shaped around your assessment and recovery goals.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-bold text-clinic-teal">Therapy Videos</p>
              <h2 className="mt-2 text-3xl font-black text-ink">Exercise guidance patients can rewatch</h2>
            </div>
            <Link href="/videos" className="inline-flex items-center gap-2 font-bold text-clinic-blue">Open library <ArrowRight size={18} /></Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {videos.map((video) => <VideoCard key={video.id} video={video} />)}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-bold text-clinic-teal">Patient Reviews</p>
              <h2 className="mt-2 text-3xl font-black text-ink">What patients say about their recovery</h2>
            </div>
            <Link href="/reviews" className="inline-flex items-center gap-2 font-bold text-clinic-blue">Read all reviews <ArrowRight size={18} /></Link>
          </div>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.slice(0, 2).map((review) => <ReviewCard key={review.id} review={review} />)}
            </div>
            <AppointmentForm />
          </div>
        </div>
      </section>
    </main>
  );
}
