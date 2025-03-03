"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Bell, DollarSign, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function SellerTopbar({ user, profile }: { user: User; profile: any }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  const initials = user.email?.split("@")[0].slice(0, 2).toUpperCase() || "??";
  // This would come from your database in a real app
  const balance = profile.sellers?.balance || 0;

  return (
    <div className="h-16 border-b px-4 flex items-center justify-between bg-white">
      {/* Left side - Balance */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md">
          <DollarSign className="h-5 w-5" />
          <span className="font-medium">Balance: ${balance.toFixed(2)}</span>
        </div>

        <Button
          asChild
          variant="outline"
          className="gap-1 text-emerald-600 border-emerald-200"
        >
          <Link href="/protected/seller/add-deck">
            <PlusCircle className="h-4 w-4 mr-1" />
            Add New Deck
          </Link>
        </Button>
      </div>

      {/* Right side - User actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link href="/protected/seller/notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Seller Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/protected/seller/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/protected/seller/earnings">Earnings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/protected/seller/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
