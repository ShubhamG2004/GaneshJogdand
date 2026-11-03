"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, videos } from "@/lib/data";
import { VideoCard } from "@/components/VideoCard";

export function VideoLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = category === "All" || video.category === category;
      const text = `${video.title} ${video.description} ${video.category}`.toLowerCase();
      return matchesCategory && text.includes(query.toLowerCase());
    });
  }, [category, query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            className="focus-ring w-full rounded border border-slate-300 py-3 pl-11 pr-3"
            placeholder="Search exercises, pain area, symptoms"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((item) => (
            <button
              key={item}
              className={`focus-ring rounded px-4 py-3 text-sm font-bold ${
                item === category ? "bg-clinic-blue text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>
      {filtered.length === 0 ? <p className="mt-8 rounded bg-white p-6 text-center font-semibold text-slate-600">No videos found for this search.</p> : null}
    </section>
  );
}
