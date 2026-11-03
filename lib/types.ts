export type VideoCategory = "Back Pain" | "Neck Pain" | "Knee Exercise" | "Paralysis Recovery" | "Shoulder Mobility";

export type TherapyVideo = {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  createdAt: string;
  views: number;
};

export type Review = {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  result: string;
  createdAt: string;
};

export type Appointment = {
  id: string;
  createdAt: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  metric: string;
};
