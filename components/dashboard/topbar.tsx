import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export function Topbar({ user }: { user: User | null }) {
  if (!user) return null;

  const initials = user.email?.split("@")[0].slice(0, 2).toUpperCase();

  return (
    <div className="h-16 border-b px-4 flex items-center justify-end">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10"
      >
        <Link href="/protected/profile">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Link>
      </Button>
    </div>
  );
}
