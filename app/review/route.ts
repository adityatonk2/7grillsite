import { NextResponse } from "next/server";
import { PLACE_ID } from "@/lib/config";

// =========================================================================
// GOOGLE 5-STAR REVIEW REDIRECT CONFIGURATION
// =========================================================================
// PASTE YOUR GOOGLE PLACE ID STRING HERE:
// (You can also update PLACE_ID in lib/config.ts which is automatically imported below)
const GOOGLE_PLACE_ID = PLACE_ID || "ChIJN3j1BgApCTkRQqO70fVqT90";

// Appending ",5" directly triggers the automatic 5-star selection on Google
const TARGET_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID},5`;

export async function GET() {
  return NextResponse.redirect(TARGET_URL, {
    status: 302,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
