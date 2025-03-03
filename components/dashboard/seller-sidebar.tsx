import {
  BarChart2,
  DollarSign,
  Menu,
  PlusCircle,
  ShoppingBag,
  Store,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type Route = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export function SellerSidebar() {
  const routes: Route[] = [
    {
      href: "/protected/seller",
      label: "Dashboard",
      icon: <BarChart2 className="h-5 w-5 mr-2" />,
    },
    {
      href: "/protected/seller/add-deck",
      label: "Add New Deck",
      icon: <PlusCircle className="h-5 w-5 mr-2" />,
    },
    {
      href: "/protected/seller/my-decks",
      label: "My Decks",
      icon: <ShoppingBag className="h-5 w-5 mr-2" />,
    },
    {
      href: "/protected/seller/earnings",
      label: "Earnings",
      icon: <DollarSign className="h-5 w-5 mr-2" />,
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
              <h2 className="text-xl font-bold mb-4 text-emerald-600">
                Seller Dashboard
              </h2>
              <NavItems routes={routes} />
            </div>

            <div className="px-2 pt-4 border-t">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Link href="/protected/buyer/explore">
                  <Store className="h-5 w-5 mr-2" />
                  Switch to Buyer
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full w-64 flex-col gap-6 border-r bg-white px-4 py-8">
        <h2 className="text-xl font-bold px-2 text-emerald-600">
          Seller Dashboard
        </h2>
        <NavItems routes={routes} />

        <div className="mt-auto pt-4 border-t">
          <Button
            asChild
            variant="outline"
            className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Link href="/protected/buyer/explore">
              <Store className="h-5 w-5 mr-2" />
              Switch to Buyer
            </Link>
          </Button>
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
          className="justify-start text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
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
