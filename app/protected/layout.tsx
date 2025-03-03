import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch user profile to determine if they're a seller
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, sellers(*)")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // Handle case where user exists but profile doesn't
    // This shouldn't happen with proper auth hooks, but just in case
    redirect("/sign-in");
  }

  const isSeller = profile.is_seller && profile.sellers;

  return (
    <div className="flex h-screen">
      <Sidebar isSeller={isSeller} />
      <div className="flex-1 flex flex-col">
        <Topbar user={user} profile={profile} isSeller={isSeller} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
