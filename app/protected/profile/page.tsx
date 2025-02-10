import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="p-6 bg-card rounded-lg border space-y-4">
        <div>
          <h2 className="font-medium mb-1">Email</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>

        <div>
          <h2 className="font-medium mb-1">User ID</h2>
          <p className="text-muted-foreground">{user.id}</p>
        </div>

        <form action={signOut}>
          <Button variant="destructive" type="submit">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}
