import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { doctor } from "@/lib/data";

export const metadata = {
  title: "Contact Physiotherapist",
  description: `Contact ${doctor.name} in ${doctor.city} for appointment booking, WhatsApp consultation, and clinic directions.`
};

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="font-bold text-clinic-teal">Contact</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Reach the clinic</h1>
          <div className="mt-8 grid gap-4">
            <a className="flex gap-4 rounded border border-slate-200 bg-white p-5 font-semibold text-slate-700" href={`https://wa.me/${doctor.whatsapp}`}>
              <MessageCircle className="text-clinic-teal" /> WhatsApp the doctor
            </a>
            <a className="flex gap-4 rounded border border-slate-200 bg-white p-5 font-semibold text-slate-700" href={`tel:${doctor.phone}`}>
              <Phone className="text-clinic-blue" /> {doctor.phone}
            </a>
            <a className="flex gap-4 rounded border border-slate-200 bg-white p-5 font-semibold text-slate-700" href={`mailto:${doctor.email}`}>
              <Mail className="text-clinic-rose" /> {doctor.email}
            </a>
            <div className="flex gap-4 rounded border border-slate-200 bg-white p-5 font-semibold text-slate-700">
              <MapPin className="text-clinic-sun" /> {doctor.clinicAddress}
            </div>
          </div>
          <iframe
            title="Clinic location map"
            className="mt-6 h-72 w-full rounded border border-slate-200"
            loading="lazy"
            src="https://www.google.com/maps?q=Pune%2C%20Maharashtra&output=embed"
          />
        </div>
        <AppointmentForm />
      </section>
    </main>
  );
}
