import type { VideoCategory } from "@/lib/types";

export type VideoDocument = {
  title: string;
  description: string;
  category: VideoCategory;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  createdAt: Date;
};

export const videoModelFields = {
  title: "String",
  description: "String",
  category: "String",
  videoUrl: "String",
  thumbnail: "String",
  duration: "String",
  createdAt: "Date"
} as const;
