import Link from "next/link";
import { Clock, Play, Star } from "lucide-react";
import { TherapyVideo } from "@/lib/types";

export function VideoCard({ video }: { video: TherapyVideo }) {
  return (
    <article className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/videos/${video.id}`} className="block">
        <div className="relative aspect-video bg-slate-200">
          <img src={video.thumbnail} alt="" className="h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded bg-white px-3 py-1 text-xs font-semibold text-clinic-blue">
            {video.category}
          </span>
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-ink px-2 py-1 text-xs font-semibold text-white">
            <Clock size={14} /> {video.duration}
          </span>
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded bg-white/90 text-clinic-blue">
            <Play size={24} fill="currentColor" />
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-ink">{video.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{video.description}</p>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{video.views.toLocaleString("en-IN")} views</span>
            <span className="flex items-center gap-1 text-clinic-sun"><Star size={14} fill="currentColor" /> Patient favorite</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
