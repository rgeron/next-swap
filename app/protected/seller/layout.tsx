import { SellerSidebar } from "@/components/dashboard/seller-sidebar";
import { SellerTopbar } from "@/components/dashboard/seller-topbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SellerLayout({
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
    redirect("/sign-in");
  }

  // Check if user is a seller
  const isSeller = profile.is_seller && profile.sellers;

  if (!isSeller) {
    // Redirect to seller onboarding if they're not a seller yet
    redirect("/protected/buyer/become-seller");
  }

  return (
    <>
      <SellerSidebar />
      <div className="flex-1 flex flex-col">
        <SellerTopbar user={user} profile={profile} />
        <main className="flex-1 overflow-y-auto p-4 bg-emerald-50">
          {children}
        </main>
      </div>
    </>
  );
}
