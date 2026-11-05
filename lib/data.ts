import { Review, Story, TherapyVideo } from "./types";

export const doctor = {
  name: "Dr. Ganesh Jogdand",
  specialization: "Home Visit Physiotherapist",
  city: "Pune",
  experience: "1 year",
  clinicAddress: "Pune, Maharashtra",
  phone: "+91 98232 42167",
  whatsapp: "919823242167",
  email: "clinic@example.com",
  about:
    "Physiotherapy visits at home in Pune, with assessment-led support for pain, mobility, post-surgery recovery, and neurological rehabilitation. Treatment options may include exercise therapy, dry needling, or cupping when appropriate after assessment.",
  achievements: [
    "Home-based physiotherapy visits across Pune",
    "Care plans for orthopedic and neurological recovery",
    "Treatment options selected after an individual assessment"
  ]
};

export const categories = ["Back Pain", "Neck Pain", "Knee Exercise", "Paralysis Recovery", "Shoulder Mobility"] as const;

export const videos: TherapyVideo[] = [
  {
    id: "back-pain-morning-routine",
    title: "Morning Back Pain Relief Routine",
    description: "A gentle 8-minute mobility flow for people with lower back stiffness and desk-work pain.",
    category: "Back Pain",
    duration: "08:12",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-03-18",
    views: 1840
  },
  {
    id: "neck-pain-office-stretches",
    title: "Neck Pain Stretches for Office Workers",
    description: "Simple posture corrections and stretches to reduce neck tightness during long work days.",
    category: "Neck Pain",
    duration: "06:45",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-02-26",
    views: 2175
  },
  {
    id: "knee-strength-basics",
    title: "Knee Strength Basics After Pain",
    description: "Low-impact exercises for knee stability, daily walking confidence, and early rehab.",
    category: "Knee Exercise",
    duration: "10:04",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-30",
    views: 1462
  }
];

export const reviews: Review[] = [
  {
    id: "review-1",
    patientName: "Sneha P.",
    rating: 5,
    comment: "My back pain reduced within three weeks and I finally understood which exercises to do safely.",
    result: "Back pain reduced from daily pain to occasional stiffness.",
    createdAt: "2026-04-04"
  },
  {
    id: "review-2",
    patientName: "Mahesh K.",
    rating: 5,
    comment: "Clear treatment plan, simple home exercises, and very patient guidance for my father.",
    result: "Improved walking balance after neuro rehab.",
    createdAt: "2026-03-22"
  },
  {
    id: "review-3",
    patientName: "Aarti S.",
    rating: 4,
    comment: "The knee program helped me climb stairs again without fear.",
    result: "Returned to regular walking and stairs.",
    createdAt: "2026-02-11"
  }
];

export const stories: Story[] = [
  {
    id: "story-1",
    title: "Lower back pain to active workdays",
    description: "A desk-working patient used posture correction and progressive strengthening to return to full days without flare-ups.",
    metric: "21 days"
  },
  {
    id: "story-2",
    title: "Post-stroke walking confidence",
    description: "Family-assisted neuro rehab with balance drills, gait practice, and home exercise tracking.",
    metric: "8 weeks"
  },
  {
    id: "story-3",
    title: "Knee pain recovery for daily stairs",
    description: "A strength-first plan helped rebuild knee stability and reduce fear during stairs.",
    metric: "4 weeks"
  }
];
