import { NextResponse } from "next/server";
import { getFirebaseDb, isDoctorToken } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snapshot = await getFirebaseDb().collection("videos").orderBy("createdAt", "desc").get();
    const videos = snapshot.docs.map((document) => document.data());
    return NextResponse.json({ videos });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load videos.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Doctor authentication is required." }, { status: 401 });
  }

  try {
    if (!(await isDoctorToken(token))) {
      return NextResponse.json({ error: "Only the doctor account can add videos." }, { status: 403 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to verify doctor authentication.";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const body = await request.json();
  const video = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...body
  };

  try {
    await getFirebaseDb().collection("videos").doc(video.id).set(video);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save video.";
    return NextResponse.json({ error: message }, { status: 503 });
  }

  return NextResponse.json(
    {
      video
    },
    { status: 201 }
  );
}
