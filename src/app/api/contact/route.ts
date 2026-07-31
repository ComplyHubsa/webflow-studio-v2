import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwVcdMfRGO7TDeVBbXcTNxklno34B3UMoxAO6RACp_jzCpMDAMlhtVfyxnQf0EuHVI/exec";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    email,
    phone,
    hasWebsite,
    websiteUrl,
    industry,
    message,
    // Brief detail — collected up front so a concept can be designed without a back-and-forth.
    businessName,
    demoPreference,
    about,
    services,
    serviceArea,
    hours,
    whyChoose,
  } = body;

  if (!name || !email || !phone || !hasWebsite || !industry) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // The Apps Script only writes the columns it already knows about, so any new
  // field would be silently dropped. Fold the brief into `message` too, which is
  // a column that definitely exists, to guarantee nothing is lost.
  const brief = [
    businessName && `Business name: ${businessName}`,
    demoPreference && `Demo they like: ${demoPreference}`,
    about && `About: ${about}`,
    services && `Services: ${services}`,
    serviceArea && `Areas served: ${serviceArea}`,
    hours && `Hours: ${hours}`,
    whyChoose && `Why choose them: ${whyChoose}`,
  ].filter(Boolean);

  const fullMessage = [message?.trim(), brief.length ? brief.join("\n") : null]
    .filter(Boolean)
    .join("\n\n--- BRIEF ---\n");

  const params = new URLSearchParams({
    name,
    email,
    phone,
    hasWebsite,
    websiteUrl: websiteUrl || "",
    industry,
    message: fullMessage || "",
    businessName: businessName || "",
    demoPreference: demoPreference || "",
    about: about || "",
    services: services || "",
    serviceArea: serviceArea || "",
    hours: hours || "",
    whyChoose: whyChoose || "",
  });

  const res = await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
