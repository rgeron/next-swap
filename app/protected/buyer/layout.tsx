import { BuyerSidebar } from "@/components/dashboard/buyer-sidebar";
import { BuyerTopbar } from "@/components/dashboard/buyer-topbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, sellers(*)")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/auth/sign-in");
  }

  const isSeller = profile.is_seller && profile.sellers;

  return (
    <>
      <BuyerSidebar isSeller={isSeller} />
      <div className="flex-1 flex flex-col">
        <BuyerTopbar user={user} profile={profile} isSeller={isSeller} />
        <main className="flex-1 overflow-y-auto p-4 bg-blue-50">
          {children}
        </main>
      </div>
    </>
  );
}
