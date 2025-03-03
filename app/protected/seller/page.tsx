import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import {
  ArrowUpRight,
  BarChart2,
  DollarSign,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export default async function SellerDashboardPage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch seller profile
  const { data: sellerProfile } = await supabase
    .from("sellers")
    .select("*, profiles(*)")
    .eq("user_id", user.id)
    .single();

  // Fetch seller's decks
  const { data: decks } = await supabase
    .from("decks")
    .select("*, purchases(created_at, amount)")
    .eq("seller_id", user.id);

  // Calculate stats
  const totalDecks = decks?.length || 0;
  const totalSales =
    decks?.reduce((sum, deck) => sum + (deck.purchases?.length || 0), 0) || 0;
  const totalRevenue =
    decks?.reduce((sum, deck) => {
      return (
        sum +
        (deck.purchases?.reduce(
          (deckSum, purchase) => deckSum + purchase.amount,
          0
        ) || 0)
      );
    }, 0) || 0;

  // Platform fee (10%)
  const platformFee = totalRevenue * 0.1;
  const netRevenue = totalRevenue - platformFee;

  // Get recent sales
  const recentSales = decks
    ?.flatMap((deck) =>
      (deck.purchases || []).map((purchase) => ({
        ...purchase,
        deck_title: deck.title,
        deck_id: deck.id,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  // Get top selling decks
  const topSellingDecks = [...(decks || [])]
    .sort((a, b) => (b.purchases?.length || 0) - (a.purchases?.length || 0))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">
              Net: ${netRevenue.toFixed(2)} after platform fees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-gray-500 mt-1">
              Across {totalDecks} decks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-gray-500 mt-1">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-gray-500 mt-1">From 36 ratings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Your sales performance over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-16 w-16 text-gray-200 mb-4" />
              <p className="text-gray-500">
                Sales chart visualization will appear here
              </p>
              <p className="text-sm text-gray-400 mt-1">
                (Requires chart library integration)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Decks</CardTitle>
            <CardDescription>Your best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingDecks?.length > 0 ? (
                topSellingDecks.map((deck) => (
                  <div
                    key={deck.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{deck.title}</p>
                      <p className="text-sm text-gray-500">
                        {deck.purchases?.length || 0} sales · $
                        {deck.price.toFixed(2)}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`/protected/seller/decks/${deck.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No sales data available yet
                </p>
              )}

              <Button variant="outline" className="w-full" asChild>
                <a href="/protected/seller/my-decks">View All Decks</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSales?.length > 0 ? (
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{sale.deck_title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(sale.created_at).toLocaleDateString()} · $
                      {sale.amount.toFixed(2)}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`/protected/seller/decks/${sale.deck_id}`}>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Users className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No sales yet</h3>
              <p className="text-gray-500 mb-4">
                Your sales will appear here once customers start purchasing your
                decks
              </p>
              <Button asChild>
                <a href="/protected/seller/add-deck">Add New Deck</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
