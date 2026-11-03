import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { doctor } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://physiocare.example.com"),
  title: {
    default: `${doctor.name} | Best Physiotherapist in ${doctor.city}`,
    template: `%s | ${doctor.name}`
  },
  description: `${doctor.name} offers expert physiotherapy for back pain, neck pain, knee rehab, paralysis recovery, and mobility care in ${doctor.city}.`,
  keywords: ["physiotherapist Pune", "back pain treatment Pune", "neck pain exercises", "knee physiotherapy", "paralysis recovery physiotherapy"],
  openGraph: {
    title: `${doctor.name} | Physiotherapy in ${doctor.city}`,
    description: doctor.about,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
