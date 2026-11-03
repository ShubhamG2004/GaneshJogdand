import Link from "next/link";
import { CalendarDays, LockKeyhole, Stethoscope } from "lucide-react";
import { doctor } from "@/lib/data";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const links = [
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/videos", label: "Videos" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-ink">
          <span className="flex h-11 w-11 items-center justify-center rounded bg-clinic-blue text-white">
            <Stethoscope size={24} />
          </span>
          <span className="leading-tight">
            <span className="block text-base">{doctor.name}</span>
            <span className="block text-xs font-medium text-slate-500">{doctor.specialization}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-clinic-blue">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/admin"
            className="focus-ring inline-flex items-center gap-2 rounded border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700 hover:border-clinic-blue hover:text-clinic-blue"
          >
            <LockKeyhole size={17} />
            Login
          </Link>
          <Link
            href="/book-appointment"
            className="focus-ring inline-flex items-center gap-2 rounded bg-clinic-blue px-4 py-3 text-sm font-semibold text-white shadow-soft hover:bg-blue-700"
          >
            <CalendarDays size={18} />
            Book
          </Link>
        </div>
      </div>
    </header>
  );
}
