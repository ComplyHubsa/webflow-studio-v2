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

  // The Apps Script only writes in doPost, and it JSON.parse()s the body.
  // doGet is just a health check ("ComplyHub webhook is running") — calling it
  // returns 200 while silently discarding the lead.
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
      hasWebsite,
      websiteUrl: websiteUrl || "",
      industry,
      message: fullMessage || "",
      // The live script reads `business` and `extraInfo`; the newer one reads
      // `businessName` and the individual brief fields. Send both shapes so
      // this works either side of the Apps Script being updated.
      business: businessName || "",
      businessName: businessName || "",
      extraInfo: fullMessage || "",
      demoPreference: demoPreference || "",
      about: about || "",
      services: services || "",
      serviceArea: serviceArea || "",
      hours: hours || "",
      whyChoose: whyChoose || "",
    }),
    redirect: "follow",
  });

  const text = await res.text();

  // Apps Script returns 200 with an HTML error page when the script throws, so
  // a status check alone isn't enough to know the row was actually written.
  if (!res.ok || /SyntaxError|TypeError|ReferenceError|Exception/i.test(text)) {
    console.error("Lead submission failed:", res.status, text.slice(0, 500));
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
