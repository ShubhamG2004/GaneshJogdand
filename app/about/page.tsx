import { Award, GraduationCap, HeartPulse } from "lucide-react";
import { doctor } from "@/lib/data";

export const metadata = {
  title: `About ${doctor.name}`,
  description: `Learn about ${doctor.name} and home visit physiotherapy services in ${doctor.city}.`
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1100&q=80"
          alt="Physiotherapist providing care to a patient"
          className="aspect-[4/5] w-full rounded object-cover shadow-soft"
        />
        <div>
          <p className="font-bold text-clinic-teal">About Doctor</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{doctor.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">{doctor.about}</p>
          <div className="mt-8 grid gap-4">
            {doctor.achievements.map((achievement, index) => {
              const icons = [HeartPulse, GraduationCap, Award];
              const Icon = icons[index] ?? Award;
              return (
                <div key={achievement} className="flex gap-4 rounded border border-slate-200 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-clinic-mint text-clinic-teal">
                    <Icon size={24} />
                  </span>
                  <p className="font-semibold leading-7 text-slate-700">{achievement}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
