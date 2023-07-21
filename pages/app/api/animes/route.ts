import { NextResponse } from "next/server";

export async function GET() {
    if (typeof window !== "undefined") {
      // Client-only code that uses fandomscraper and jsdom
      const { availableWikis } = await import("fandomscraper");
      return NextResponse.json(availableWikis);
    } else {
        console.log(typeof window);
        
      // Server-side code here (if needed)
      return NextResponse.json({ error: "This route is only available on the client" });
    }
  }