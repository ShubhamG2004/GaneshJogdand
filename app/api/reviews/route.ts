import { NextResponse } from "next/server";
import { getFirebaseDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snapshot = await getFirebaseDb().collection("reviews").orderBy("createdAt", "desc").get();
    const reviews = snapshot.docs.map((document) => document.data());
    return NextResponse.json({ reviews });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load reviews.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const patientName = String(body.patientName || "").trim();
  const comment = String(body.comment || "").trim();
  const result = String(body.result || "").trim();
  const rating = Number(body.rating);

  if (!patientName || !comment || !result || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Please provide your name, a rating from 1 to 5, a review, and a recovery result." },
      { status: 400 }
    );
  }

  const review = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    patientName,
    rating,
    comment,
    result
  };

  try {
    await getFirebaseDb().collection("reviews").doc(review.id).set(review);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save review.";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  return NextResponse.json(
    {
      review
    },
    { status: 201 }
  );
}
