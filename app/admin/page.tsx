import { AdminDashboard } from "@/components/AdminDashboard";
import { doctor } from "@/lib/data";

export const metadata = {
  title: "Doctor Admin Dashboard",
  description: `Admin dashboard for ${doctor.name} to manage therapy videos, reviews, and clinic content.`,
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return (
    <main className="bg-slate-50">
      <AdminDashboard />
    </main>
  );
}
