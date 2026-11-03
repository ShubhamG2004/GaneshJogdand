import { AppointmentForm } from "@/components/AppointmentForm";
import { doctor } from "@/lib/data";

export const metadata = {
  title: "Book a Home Physiotherapy Visit",
  description: `Request a home physiotherapy visit with ${doctor.name} in ${doctor.city}.`
};

export default function BookAppointmentPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="font-bold text-clinic-teal">Home visit request</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-black text-ink">Physiotherapy care, in the comfort of home</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            Tell us where you are in Pune, what support you need, and when you prefer a visit. We’ll contact you to discuss availability and the next step.
          </p>
        </div>
        <AppointmentForm />
      </section>
    </main>
  );
}
