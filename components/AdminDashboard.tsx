"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  Activity,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Edit3,
  LayoutDashboard,
  Lock,
  Plus,
  Save,
  Star,
  Trash2,
  UploadCloud,
  Video
} from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase-client";
import { categories, reviews, videos as seedVideos } from "@/lib/data";
import { Appointment, TherapyVideo } from "@/lib/types";

export function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [videos, setVideos] = useState<TherapyVideo[]>(seedVideos);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsMessage, setAppointmentsMessage] = useState("");
  const [appointmentsRetry, setAppointmentsRetry] = useState(0);
  const [message, setMessage] = useState("");

  const totalViews = useMemo(() => videos.reduce((sum, video) => sum + video.views, 0), [videos]);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      return onAuthStateChanged(auth, (user) => {
        setLoggedIn(Boolean(user));
        setAuthLoading(false);
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Firebase authentication is not configured.");
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    async function loadAppointments() {
      setAppointmentsLoading(true);
      setAppointmentsMessage("");

      try {
        const token = await getFirebaseAuth().currentUser?.getIdToken();
        if (!token) {
          throw new Error("Your Firebase session has expired. Please sign in again.");
        }

        const response = await fetch("/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await readApiResponse(response);

        if (!response.ok) {
          throw new Error(result.error || "Unable to load appointments.");
        }

        if (!Array.isArray(result.appointments)) {
          throw new Error("The appointments service returned an invalid response.");
        }

        setAppointments(result.appointments as Appointment[]);
      } catch (error) {
        setAppointmentsMessage(error instanceof Error ? error.message : "Unable to load appointments.");
      } finally {
        setAppointmentsLoading(false);
      }
    }

    void loadAppointments();
  }, [loggedIn, appointmentsRetry]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    }
  }

  async function logout() {
    await signOut(getFirebaseAuth());
    setMessage("");
  }

  async function uploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "");
    const description = String(form.get("description") || "");
    const category = String(form.get("category") || categories[0]) as TherapyVideo["category"];
    const thumbnail = String(form.get("thumbnail") || seedVideos[0].thumbnail);

    try {
      const token = await getFirebaseAuth().currentUser?.getIdToken();
      if (!token) {
        throw new Error("Your Firebase session has expired. Please sign in again.");
      }

      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          category,
          thumbnail,
          duration: String(form.get("duration") || "03:00"),
          videoUrl: String(form.get("videoUrl") || "https://www.youtube.com/embed/dQw4w9WgXQ")
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save video.");
      }

      setVideos((current) => [result.video, ...current]);
      event.currentTarget.reset();
      setMessage("Video saved to Firebase.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save video.");
    }
  }

  if (authLoading) {
    return <section className="mx-auto max-w-md px-4 py-16 text-center text-slate-600">Checking doctor authentication...</section>;
  }

  if (!loggedIn) {
    return (
      <section className="mx-auto max-w-md px-4 py-16">
        <form onSubmit={login} className="rounded border border-slate-200 bg-white p-6 shadow-soft">
          <span className="flex h-12 w-12 items-center justify-center rounded bg-clinic-mint text-clinic-teal">
            <Lock size={24} />
          </span>
          <h1 className="mt-4 text-3xl font-black text-ink">Doctor Login</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Sign in with the doctor account created in Firebase Authentication.</p>
          <label className="mt-6 grid gap-2 text-sm font-semibold text-slate-700">
            Email
            <input
              className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="doctor@example.com"
              required
            />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
            Password
            <input
              className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-clinic-blue px-5 py-3 font-bold text-white">
            <Lock size={18} /> Login
          </button>
          {message ? <p className="mt-4 rounded bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">{message}</p> : null}
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-100/70">
      <div className="mx-auto flex max-w-[1480px] flex-col lg:flex-row">
        <aside className="bg-[#10243b] px-5 py-6 text-white lg:min-h-[calc(100vh-80px)] lg:w-64 lg:shrink-0 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-clinic-blue shadow-lg shadow-blue-950/30"><Activity size={21} /></span>
            <div><p className="text-sm font-black">PhysioCare</p><p className="text-[11px] text-slate-400">Admin workspace</p></div>
          </div>
          <nav className="mt-10 space-y-2" aria-label="Admin navigation">
            <a href="#overview" className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-bold text-white"><LayoutDashboard size={17} /> Overview</a>
            <a href="#videos" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"><Video size={17} /> Video library</a>
            <a href="#appointments" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"><CalendarCheck size={17} /> Appointments</a>
          </nav>
          <div className="mt-10 hidden rounded-2xl border border-white/10 bg-white/5 p-4 lg:block">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Workspace status</p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-emerald-400" /> All systems operational</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
          <header id="overview" className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-clinic-blue">Clinic overview</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-ink sm:text-4xl">Good evening, Doctor</h1>
              <p className="mt-2 text-sm text-slate-500">Here’s what’s happening with your clinic today.</p>
            </div>
            <button type="button" onClick={logout} className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">Sign out</button>
          </header>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Total videos" value={videos.length.toString()} icon={<Video size={19} />} detail="Published resources" />
            <Stat label="Patient reviews" value={reviews.length.toString()} icon={<Star size={19} />} detail="Average 4.7 / 5" />
            <Stat label="Total views" value={totalViews.toLocaleString("en-IN")} icon={<ArrowUpRight size={19} />} detail="Across all videos" />
            <Stat label="Appointments" value={appointments.length.toString()} icon={<CalendarCheck size={19} />} detail="Requests received" />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <form onSubmit={uploadVideo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <PanelHeading icon={<UploadCloud size={20} />} eyebrow="Content management" title="Add a therapy video" description="Publish a new resource for your patients." />
              <div className="mt-5 grid gap-4">
                <Field name="title" label="Title" placeholder="Shoulder pain mobility routine" required />
                <label className="grid min-w-0 gap-2 text-sm font-semibold text-slate-700">Description<textarea name="description" required className="focus-ring min-h-24 min-w-0 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-normal placeholder:text-slate-400" placeholder="Explain who this exercise is for and key precautions" /></label>
                <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                  <label className="grid min-w-0 gap-2 text-sm font-semibold text-slate-700">Category<select name="category" className="focus-ring min-w-0 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-normal">{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
                  <Field name="duration" label="Duration" placeholder="07:30" required />
                </div>
                <Field name="videoUrl" label="Video URL" placeholder="Cloudinary/Youtube embed URL" required />
                <Field name="thumbnail" label="Thumbnail URL" placeholder="Cloudinary thumbnail URL" />
                <button className="focus-ring mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-clinic-blue px-5 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"><Plus size={18} /> Add video</button>
                {message ? <p className="rounded-xl bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{message}</p> : null}
              </div>
            </form>

            <div id="videos" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-end justify-between gap-3"><PanelHeading icon={<Video size={20} />} eyebrow="Content management" title="Video library" description="Manage your published therapy resources." /><span className="text-xs font-bold text-slate-400">{videos.length} published</span></div>
              <div className="mt-5 grid gap-3">
                {videos.map((video) => (
                  <article key={video.id} className="group grid gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-blue-100 hover:bg-blue-50/30 sm:grid-cols-[112px_1fr_auto] sm:items-center">
                    <div className="relative"><img src={video.thumbnail} alt="" className="aspect-video w-full rounded-lg object-cover" /><span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">{video.duration}</span></div>
                    <div><p className="text-[11px] font-bold uppercase tracking-wide text-clinic-teal">{video.category}</p><h3 className="mt-1 font-bold text-ink">{video.title}</h3><p className="mt-1 line-clamp-1 text-xs text-slate-500">{video.views.toLocaleString("en-IN")} views · Published resource</p></div>
                    <div className="flex gap-2 sm:flex-col"><button className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm hover:text-clinic-blue" aria-label="Edit video"><Edit3 size={16} /></button><button className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm hover:bg-red-50" aria-label="Delete video" onClick={() => setVideos((current) => current.filter((item) => item.id !== video.id))}><Trash2 size={16} /></button></div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div id="appointments" className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><PanelHeading icon={<CalendarCheck size={20} />} eyebrow="Patient care" title="Appointment requests" description="Review patient contact details and visit requirements." /><span className={`rounded-full px-3 py-1 text-xs font-bold ${appointmentsMessage ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-clinic-blue"}`}>{appointmentsMessage ? "Unavailable" : `${appointments.length} total`}</span></div>
            {appointmentsLoading ? <p className="mt-5 text-sm text-slate-500">Loading appointments...</p> : null}
            {appointmentsMessage ? <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"><p>{appointmentsMessage}</p><button type="button" onClick={() => setAppointmentsRetry((current) => current + 1)} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-red-700 shadow-sm hover:bg-red-100">Retry</button></div> : null}
            {!appointmentsLoading && !appointmentsMessage && appointments.length === 0 ? <p className="mt-5 rounded-xl bg-slate-50 px-3 py-4 text-sm text-slate-600">No appointment requests yet.</p> : null}
            <div className="mt-5 grid gap-3">{appointments.map((appointment) => <article key={appointment.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-ink">{appointment.name}</h3><span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold capitalize text-emerald-700"><CheckCircle2 size={12} /> {appointment.status}</span></div><p className="mt-1 text-xs text-slate-500">{formatAppointmentDate(appointment.createdAt)}</p></div><p className="text-sm font-bold text-clinic-teal">{appointment.service}</p></div><div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2"><p><span className="font-bold">Email:</span> <a className="text-clinic-blue hover:underline" href={`mailto:${appointment.email}`}>{appointment.email}</a></p><p><span className="font-bold">Phone:</span> <a className="text-clinic-blue hover:underline" href={`tel:${appointment.phone}`}>{appointment.phone}</a></p></div><p className="mt-3 whitespace-pre-wrap rounded-lg bg-white p-3 text-sm leading-6 text-slate-600">{appointment.message}</p></article>)}</div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><PanelHeading icon={<Save size={20} />} eyebrow="System overview" title="Connected services" description="Your admin tools are configured for production." /><div className="mt-5 grid gap-3 md:grid-cols-3">{["Firebase authentication", "Cloudinary video upload", "MongoDB models and API persistence"].map((item) => <p key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700"><CheckCircle2 size={16} className="text-emerald-500" /> {item}</p>)}</div></div>
        </div>
      </div>
    </section>
  );
}

type AppointmentApiResponse = {
  error?: string;
  appointments?: unknown;
};

async function readApiResponse(response: Response): Promise<AppointmentApiResponse> {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const body = await response.text();
    console.error("Appointments API returned a non-JSON response:", {
      status: response.status,
      body: body.slice(0, 200)
    });
    throw new Error(
      response.status === 404
        ? "The appointments API is not available in this production deployment. Redeploy the latest Next.js server build."
        : `The appointments service returned an unexpected response (HTTP ${response.status}).`
    );
  }

  try {
    return await response.json() as AppointmentApiResponse;
  } catch (error) {
    console.error("Appointments API returned invalid JSON:", error);
    throw new Error("The appointments service returned invalid JSON.");
  }
}

function Field({ name, label, placeholder, required }: { name: string; label: string; placeholder: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <input name={name} required={required} className="focus-ring min-w-0 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-normal placeholder:text-slate-400" placeholder={placeholder} />
    </label>
  );
}

function Stat({ label, value, icon, detail }: { label: string; value: string; icon: ReactNode; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-clinic-blue">{icon}</span><ArrowUpRight size={16} className="text-slate-300" /></div>
      <p className="mt-4 text-2xl font-black text-ink">{value}</p>
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
  );
}

function PanelHeading({ icon, eyebrow, title, description }: { icon: ReactNode; eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-clinic-mint text-clinic-teal">{icon}</span>
      <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-clinic-teal">{eyebrow}</p><h2 className="mt-0.5 text-lg font-black text-ink">{title}</h2><p className="mt-1 text-xs text-slate-500">{description}</p></div>
    </div>
  );
}

function formatAppointmentDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}
