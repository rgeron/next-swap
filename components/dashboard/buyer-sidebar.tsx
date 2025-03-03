import { BookOpen, Heart, Menu, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type Route = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export function BuyerSidebar({ isSeller }: { isSeller: boolean }) {
  const routes: Route[] = [
    {
      href: "/protected/buyer/explore",
      label: "Explore",
      icon: <ShoppingBag className="h-5 w-5 mr-2" />,
    },
    {
      href: "/protected/buyer/search",
      label: "Search",
      icon: <BookOpen className="h-5 w-5 mr-2" />,
    },
    {
      href: "/protected/buyer/purchased",
      label: "My Purchases",
      icon: <ShoppingBag className="h-5 w-5 mr-2" />,
    },
    {
      href: "/protected/buyer/favorites",
      label: "Favorites",
      icon: <Heart className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <>
      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden absolute top-4 left-4 z-50">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white">
          <div className="mt-8 flex flex-col gap-6">
            <div className="px-2">
              <h2 className="text-xl font-bold mb-4 text-blue-600">
                Flashcard Marketplace
              </h2>
              <NavItems routes={routes} />
            </div>

            {isSeller && (
              <div className="px-2 pt-4 border-t">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                >
                  <Link href="/protected/seller">
                    <Store className="h-5 w-5 mr-2" />
                    Switch to Seller
                  </Link>
                </Button>
              </div>
            )}

            {!isSeller && (
              <div className="px-2 pt-4 border-t">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                >
                  <Link href="/protected/buyer/become-seller">
                    <Store className="h-5 w-5 mr-2" />
                    Become a Seller
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full w-64 flex-col gap-6 border-r bg-white px-4 py-8">
        <h2 className="text-xl font-bold px-2 text-blue-600">
          Flashcard Marketplace
        </h2>
        <NavItems routes={routes} />

        <div className="mt-auto pt-4 border-t">
          {isSeller ? (
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            >
              <Link href="/protected/seller">
                <Store className="h-5 w-5 mr-2" />
                Switch to Seller
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            >
              <Link href="/protected/buyer/become-seller">
                <Store className="h-5 w-5 mr-2" />
                Become a Seller
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

function NavItems({ routes }: { routes: Route[] }) {
  return (
    <div className="flex flex-col gap-1">
      {routes.map((route) => (
        <Button
          key={route.href}
          asChild
          variant="ghost"
          className="justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        >
          <Link href={route.href}>
            {route.icon}
            {route.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}
