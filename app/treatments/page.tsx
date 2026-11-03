import Link from "next/link";
import { Activity, ArrowRight, Brain, Footprints, Laptop, PersonStanding } from "lucide-react";
import { doctor } from "@/lib/data";

export const metadata = {
  title: `Home Physiotherapy Services in ${doctor.city}`,
  description: `Home visit physiotherapy for pain, rehabilitation, and mobility in ${doctor.city}. Ask about dry needling and cupping after assessment.`
};

const treatments = [
  { title: "Back and Neck Pain", icon: Activity, text: "A home assessment and an exercise plan tailored to your movement, symptoms, and daily routine." },
  { title: "Knee and Joint Rehabilitation", icon: Footprints, text: "Strength, balance, and walking practice to support mobility and everyday activities." },
  { title: "Neurological Rehabilitation", icon: Brain, text: "At-home mobility, balance, and gait practice, with guidance for family caregivers." },
  { title: "Post-surgery Recovery", icon: PersonStanding, text: "A gradual rehabilitation plan based on your procedure and the advice of your treating team." },
  { title: "Dry Needling and Cupping", icon: Laptop, text: "Ask about these hands-on options. A physiotherapist will first assess whether they are appropriate for you." }
];

export default function TreatmentsPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="font-bold text-clinic-teal">Treatments</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-black text-ink">Physiotherapy services delivered at home in {doctor.city}</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map(({ title, icon: Icon, text }) => (
            <article key={title} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="text-clinic-blue" size={30} />
              <h2 className="mt-4 text-2xl font-bold text-ink">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
              <Link href="/book-appointment" className="mt-5 inline-flex items-center gap-2 font-bold text-clinic-blue">
                Consult for {title} <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
