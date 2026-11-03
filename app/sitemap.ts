import type { MetadataRoute } from "next";
import { videos } from "@/lib/data";

const baseUrl = "https://physiocare.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/treatments", "/videos", "/reviews", "/contact", "/book-appointment"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));

  const videoRoutes = videos.map((video) => ({
    url: `${baseUrl}/videos/${video.id}`,
    lastModified: new Date(video.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...routes, ...videoRoutes];
}
