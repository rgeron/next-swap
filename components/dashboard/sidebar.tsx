import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type Route = {
  href: string;
  label: string;
};

const routes: Route[] = [
  { href: "/protected/home-page", label: "Home" },
  { href: "/protected/liked-decks", label: "Liked Decks" },
  { href: "/protected/purchased-decks", label: "Purchased Decks" },
  { href: "/protected/my-decks", label: "My Decks" },
  { href: "/protected/seller-info", label: "Seller Info" },
];

function NavItems({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {routes.map((route) => (
        <Button
          key={route.href}
          asChild
          variant="ghost"
          className="justify-start"
        >
          <Link href={route.href}>{route.label}</Link>
        </Button>
      ))}
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="mt-8">
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full w-64 flex-col gap-4 border-r px-4 py-8">
        <NavItems />
      </div>
    </>
  );
}
