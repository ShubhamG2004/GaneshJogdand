"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Edit3, Lock, Plus, Save, Trash2, UploadCloud } from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase-client";
import { categories, reviews, videos as seedVideos } from "@/lib/data";
import { TherapyVideo } from "@/lib/types";

export function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [videos, setVideos] = useState<TherapyVideo[]>(seedVideos);
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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-bold text-clinic-teal">Admin Panel</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Doctor Dashboard</h1>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Videos" value={videos.length.toString()} />
            <Stat label="Reviews" value={reviews.length.toString()} />
            <Stat label="Views" value={totalViews.toLocaleString("en-IN")} />
          </div>
          <button type="button" onClick={logout} className="focus-ring rounded border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={uploadVideo} className="grid gap-4 rounded border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded bg-clinic-mint text-clinic-teal">
              <UploadCloud size={24} />
            </span>
            <div>
              <h2 className="text-xl font-black text-ink">Upload Therapy Video</h2>
              <p className="text-sm text-slate-500">Use Cloudinary upload widget in production.</p>
            </div>
          </div>
          <Field name="title" label="Title" placeholder="Shoulder pain mobility routine" required />
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Description
            <textarea name="description" required className="focus-ring min-h-24 rounded border border-slate-300 px-3 py-3 font-normal" placeholder="Explain who this exercise is for and key precautions" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Category
              <select name="category" className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal">
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <Field name="duration" label="Duration" placeholder="07:30" required />
          </div>
          <Field name="videoUrl" label="Video URL" placeholder="Cloudinary/Youtube embed URL" required />
          <Field name="thumbnail" label="Thumbnail URL" placeholder="Cloudinary thumbnail URL" />
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-clinic-blue px-5 py-3 font-bold text-white">
            <Plus size={18} /> Add Video
          </button>
          {message ? <p className="rounded bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{message}</p> : null}
        </form>

        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-ink">Manage Videos</h2>
          <div className="mt-5 grid gap-4">
            {videos.map((video) => (
              <article key={video.id} className="grid gap-4 rounded border border-slate-200 p-4 sm:grid-cols-[120px_1fr_auto]">
                <img src={video.thumbnail} alt="" className="aspect-video w-full rounded object-cover" />
                <div>
                  <p className="text-xs font-bold text-clinic-teal">{video.category}</p>
                  <h3 className="font-bold text-ink">{video.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{video.description}</p>
                </div>
                <div className="flex gap-2 sm:flex-col">
                  <button className="focus-ring flex h-10 w-10 items-center justify-center rounded bg-slate-100 text-slate-700" aria-label="Edit video">
                    <Edit3 size={18} />
                  </button>
                  <button
                    className="focus-ring flex h-10 w-10 items-center justify-center rounded bg-red-50 text-red-600"
                    aria-label="Delete video"
                    onClick={() => setVideos((current) => current.filter((item) => item.id !== video.id))}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-ink">Production Integrations</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["Clerk authentication", "Cloudinary video upload", "MongoDB models and API persistence"].map((item) => (
            <p key={item} className="flex items-center gap-2 rounded bg-slate-50 p-3 text-sm font-semibold text-slate-700">
              <Save size={16} className="text-clinic-blue" /> {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, placeholder, required }: { name: string; label: string; placeholder: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <input name={name} required={required} className="focus-ring rounded border border-slate-300 px-3 py-3 font-normal" placeholder={placeholder} />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
      <p className="text-xl font-black text-clinic-blue">{value}</p>
      <p className="text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}
