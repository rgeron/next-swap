"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function createUserProfile(user: User) {
  const supabase = await createClient();

  // Check if profile already exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (existingProfile) {
    // Profile already exists, no need to create a new one
    return { success: true, profile: existingProfile };
  }

  // Extract username from email (everything before @)
  const email = user.email || "";
  const username = email.split("@")[0];

  // Create new profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email,
      username,
      full_name: user.user_metadata?.full_name || "",
      avatar_url: user.user_metadata?.avatar_url || "",
      is_seller: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating profile:", error);
    return { success: false, error: error.message };
  }

  return { success: true, profile };
}
