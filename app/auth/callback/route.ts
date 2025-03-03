import { handleAuthCallbackAction } from "@/app/actions/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Get the code from the URL
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/protected";

  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  // Handle the auth callback
  return handleAuthCallbackAction(code, next);
}
