import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { VideoCard } from "@/components/VideoCard";
import { doctor, videos } from "@/lib/data";

type Props = { params: { id: string } };

export function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const video = videos.find((item) => item.id === params.id);
  if (!video) return {};
  return {
    title: video.title,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
      type: "video.other"
    }
  };
}

export default function VideoDetailPage({ params }: Props) {
  const video = videos.find((item) => item.id === params.id);
  if (!video) notFound();
  const related = videos.filter((item) => item.category === video.category && item.id !== video.id).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnail],
    uploadDate: video.createdAt,
    contentUrl: video.videoUrl,
    author: {
      "@type": "Person",
      name: doctor.name
    }
  };

  return (
    <main className="bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-soft">
          <iframe
            className="aspect-video w-full"
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="p-6">
            <p className="font-bold text-clinic-teal">{video.category}</p>
            <h1 className="mt-2 text-3xl font-black text-ink">{video.title}</h1>
            <p className="mt-3 leading-7 text-slate-600">{video.description}</p>
            <Link href="/book-appointment" className="mt-6 inline-flex items-center gap-2 rounded bg-clinic-blue px-5 py-3 font-bold text-white">
              <CalendarDays size={18} /> Book a guided session
            </Link>
          </div>
        </div>
      </section>
      {related.length ? (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-ink">Related videos</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => <VideoCard key={item.id} video={item} />)}
          </div>
        </section>
      ) : null}
    </main>
  );
}
