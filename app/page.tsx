import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Activity,
  Brain,
  ChevronRight,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  Home,
  MessageCircle,
  PersonStanding,
  Play,
  Sparkles
} from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ReviewCard } from "@/components/ReviewCard";
import { doctor, reviews, videos } from "@/lib/data";

const careAreas = [
  { number: "01", icon: Activity, title: "Pain relief", text: "Understand what is causing your pain and build a practical plan to move with more confidence." },
  { number: "02", icon: Home, title: "Recovery at home", text: "Personal support for post-surgery, neurological, and mobility rehabilitation in familiar surroundings." },
  { number: "03", icon: Dumbbell, title: "Stronger everyday movement", text: "Simple exercises and habits that fit your real routine, not just your appointment time." }
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: doctor.name,
    medicalSpecialty: "Physiotherapy",
    description: doctor.about,
    address: { "@type": "PostalAddress", addressLocality: doctor.city, addressRegion: "Maharashtra", addressCountry: "IN" },
    telephone: doctor.phone,
    url: "https://physiocare.example.com",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: reviews.length.toString() },
    knowsAbout: ["Home visit physiotherapy", "Back pain rehabilitation", "Knee rehabilitation", "Neurological rehabilitation", "Dry needling", "Cupping"]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-clinic-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="relative z-10">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-clinic-coral">
              <span className="h-px w-8 bg-clinic-coral" /> Personal physiotherapy in Pune
            </p>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl font-bold leading-[1.02] tracking-tight text-clinic-deep sm:text-6xl lg:text-7xl">
              Feel at home in your body again.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Thoughtful, one-to-one physiotherapy by <strong className="text-clinic-deep">{doctor.name}</strong> — brought to your home, built around your recovery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book-appointment" className="focus-ring inline-flex items-center gap-2 rounded-full bg-clinic-coral px-6 py-4 font-bold text-white shadow-coral hover:bg-orange-700">
                Book a consultation <ArrowRight size={19} />
              </Link>
              <a href={`https://wa.me/${doctor.whatsapp}`} className="focus-ring inline-flex items-center gap-2 rounded-full border border-clinic-deep/20 px-6 py-4 font-bold text-clinic-deep hover:bg-white">
                <MessageCircle size={18} /> WhatsApp me
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-clinic-deep">
              {[
                { label: "Home visits across Pune", icon: Home },
                { label: "Assessment-led care", icon: ClipboardCheck },
                { label: "One-to-one attention", icon: HeartPulse }
              ].map(({ label, icon: Icon }) => (
                <span key={label} className="flex items-center gap-2"><Icon size={16} className="text-clinic-coral" /> {label}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-4 -top-5 h-28 w-28 rounded-full bg-clinic-yellow sm:-right-8 sm:-top-8" />
            <div className="absolute -bottom-5 -left-4 h-24 w-24 rounded-full border-8 border-clinic-coral/20 sm:-left-8" />
            <div className="relative overflow-hidden rounded-[2rem] rounded-bl-[5rem] bg-clinic-deep p-3 shadow-warm">
              <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=85" alt="Physiotherapist supporting a patient with recovery and mobility" className="aspect-[4/5] w-full rounded-[1.5rem] rounded-bl-[4rem] object-cover" />
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clinic-mint text-clinic-deep"><HeartPulse size={20} /></span>
                  <div><p className="text-xs font-bold uppercase tracking-wider text-clinic-coral">Your care, your pace</p><p className="mt-1 text-sm font-semibold text-clinic-deep">A plan made for real life.</p></div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm font-medium text-slate-500">Dr. Ganesh Jogdand · Home visit physiotherapist</p>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 hidden h-64 w-64 rounded-full border border-clinic-coral/20 lg:block" />
      </section>

      <section className="bg-clinic-deep py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-clinic-yellow">A better way to recover</p><h2 className="mt-3 max-w-md font-serif text-3xl leading-tight sm:text-4xl">Care that listens before it treats.</h2></div>
          <div className="grid gap-8 sm:grid-cols-3">
            {careAreas.map(({ number, icon: Icon, title, text }) => <div key={number} className="border-t border-white/20 pt-4"><div className="flex items-center justify-between"><span className="text-sm font-bold text-clinic-yellow">{number}</span><Icon size={23} className="text-clinic-yellow" /></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/70">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-clinic-sand py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-clinic-coral">How I can help</p><h2 className="mt-3 max-w-xl font-serif text-4xl text-clinic-deep sm:text-5xl">Move better, one step at a time.</h2></div><Link href="/treatments" className="inline-flex items-center gap-2 font-bold text-clinic-deep hover:text-clinic-coral">Explore all treatments <ArrowDownRight size={18} /></Link></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Back & neck pain", icon: Activity },
              { title: "Knee rehabilitation", icon: PersonStanding },
              { title: "Neurological recovery", icon: Brain },
              { title: "Post-surgery care", icon: ClipboardCheck }
            ].map(({ title, icon: Icon }, index) => <Link href="/treatments" key={title} className="group rounded-2xl border border-clinic-deep/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-warm"><div className="flex items-start justify-between"><span className="text-sm font-bold text-clinic-coral">0{index + 1}</span><span className="flex h-11 w-11 items-center justify-center rounded-full bg-clinic-mint text-clinic-deep transition group-hover:bg-clinic-coral group-hover:text-white"><Icon size={22} /></span></div><h3 className="mt-10 text-xl font-bold text-clinic-deep">{title}</h3><span className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-500 group-hover:text-clinic-coral">Learn more <ChevronRight size={18} /></span></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="relative"><img src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1000&q=85" alt="Dr. Ganesh Jogdand providing thoughtful physiotherapy care" className="aspect-[4/5] w-full rounded-[2rem] object-cover" /><div className="absolute -bottom-5 -right-4 rounded-2xl bg-clinic-yellow px-5 py-4 text-center shadow-lg sm:-right-6"><p className="font-serif text-3xl font-bold text-clinic-deep">1:1</p><p className="text-xs font-bold uppercase tracking-wider text-clinic-deep">care always</p></div></div>
          <div className="flex flex-col justify-center"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-clinic-coral"><HeartPulse size={17} /> A familiar face for your recovery</p><h2 className="mt-3 font-serif text-4xl text-clinic-deep sm:text-5xl">Hi, I&apos;m {doctor.name.split(" ").slice(1).join(" ")}.</h2><p className="mt-6 text-lg leading-8 text-slate-600">{doctor.about}</p><p className="mt-4 text-lg leading-8 text-slate-600">Every session starts with listening, observing, and understanding what you need to get back to. Then we work together on the next right step.</p><div className="mt-7 grid gap-3 text-sm font-semibold text-clinic-deep sm:grid-cols-2"><span className="flex items-center gap-2"><ClipboardCheck size={18} className="text-clinic-coral" /> Personal assessment</span><span className="flex items-center gap-2"><Dumbbell size={18} className="text-clinic-coral" /> Practical exercises</span></div><Link href="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-clinic-coral">More about my approach <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="bg-clinic-sand py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-clinic-coral">Patient stories</p><h2 className="mt-3 font-serif text-4xl text-clinic-deep sm:text-5xl">Small wins matter.</h2></div><Link href="/reviews" className="font-bold text-clinic-deep hover:text-clinic-coral">Read all reviews <ArrowRight className="ml-1 inline" size={17} /></Link></div><div className="mt-10 grid gap-5 md:grid-cols-2">{reviews.slice(0, 2).map((review) => <ReviewCard key={review.id} review={review} />)}</div></div></section>

      <section className="bg-clinic-deep py-20 text-white"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-clinic-yellow">Keep moving between visits</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Guidance you can come back to.</h2><p className="mt-5 max-w-lg leading-7 text-white/70">Browse simple exercise videos made to support your routine at home.</p><Link href="/videos" className="mt-7 inline-flex items-center gap-2 font-bold text-clinic-yellow">Visit the video library <ArrowRight size={18} /></Link></div><div className="grid gap-4 sm:grid-cols-3">{videos.map((video) => <Link href={`/videos/${video.id}`} key={video.id} className="group"><div className="relative overflow-hidden rounded-xl"><img src={video.thumbnail} alt="" className="aspect-square w-full object-cover opacity-80 transition group-hover:scale-105" /><span className="absolute inset-0 flex items-center justify-center"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-clinic-coral text-white"><Play size={18} fill="currentColor" /></span></span></div><p className="mt-3 text-sm font-bold">{video.title}</p></Link>)}</div></div></section>

      <section className="bg-clinic-coral py-16"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8"><div><Sparkles className="text-clinic-yellow" size={28} /><h2 className="mt-4 max-w-xl font-serif text-4xl font-bold text-white sm:text-5xl">Ready to make a start?</h2><p className="mt-4 max-w-lg text-white/85">Tell me what you&apos;re working through. We&apos;ll find the right first step together.</p></div><AppointmentForm /></div></section>
    </main>
  );
}
