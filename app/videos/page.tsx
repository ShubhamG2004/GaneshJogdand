import { VideoLibrary } from "@/components/VideoLibrary";
import { doctor } from "@/lib/data";

export const metadata = {
  title: "Therapy Video Library",
  description: `Watch physiotherapy exercise videos from ${doctor.name} for back pain, neck pain, knee pain, and recovery.`
};

export default function VideosPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="font-bold text-clinic-teal">Video Library</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-black text-ink">Therapy videos patients can search, filter, and rewatch</h1>
        </div>
      </section>
      <VideoLibrary />
    </main>
  );
}
