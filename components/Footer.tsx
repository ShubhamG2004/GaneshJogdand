import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { doctor } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="text-xl font-bold text-ink">{doctor.name}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{doctor.about}</p>
        </div>
        <div>
          <h3 className="font-semibold text-ink">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <Link href="/videos">Video Library</Link>
            <Link href="/treatments">Treatments</Link>
            <Link href="/reviews">Patient Reviews</Link>
            <Link href="/admin">Doctor Login</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-ink">Clinic</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-2"><MapPin size={16} /> {doctor.clinicAddress}</span>
            <a className="flex items-center gap-2" href={`tel:${doctor.phone}`}><Phone size={16} /> {doctor.phone}</a>
            <a className="flex items-center gap-2" href={`mailto:${doctor.email}`}><Mail size={16} /> {doctor.email}</a>
            <a className="flex items-center gap-2" href={`https://wa.me/${doctor.whatsapp}`}><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
