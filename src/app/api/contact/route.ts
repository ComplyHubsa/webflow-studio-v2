import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwVcdMfRGO7TDeVBbXcTNxklno34B3UMoxAO6RACp_jzCpMDAMlhtVfyxnQf0EuHVI/exec";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, hasWebsite, websiteUrl, industry, message } = body;

  if (!name || !email || !phone || !hasWebsite || !industry) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const params = new URLSearchParams({
    name,
    email,
    phone,
    hasWebsite,
    websiteUrl: websiteUrl || "",
    industry,
    message: message || "",
  });

  const res = await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
