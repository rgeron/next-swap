import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import {
  Clock,
  DownloadCloud,
  FileText,
  Search,
  Star,
  Tag,
} from "lucide-react";

export default async function PurchasedPage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch purchased decks
  const { data: purchases } = await supabase
    .from("purchases")
    .select(
      `
      id,
      created_at,
      amount,
      decks (
        id,
        title,
        description,
        card_count,
        difficulty,
        avg_rating,
        profiles (
          username,
          avatar_url
        ),
        deck_tags (
          tags (
            name
          )
        )
      )
    `
    )
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Purchased Decks</h1>

        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search your decks..."
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Decks</TabsTrigger>
          <TabsTrigger value="recent">Recently Purchased</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {purchases?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No purchased decks yet
              </h3>
              <p className="text-gray-500 mb-4">
                Explore the marketplace to find decks that match your interests
              </p>
              <Button asChild>
                <a href="/protected/buyer/explore">Explore Decks</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {purchases?.map((purchase) => (
                <div
                  key={purchase.id}
                  className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">
                        {purchase.decks.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        By {purchase.decks.profiles.username}
                      </p>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {purchase.decks.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {purchase.decks.deck_tags?.map((tagObj, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {tagObj.tags.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{purchase.decks.avg_rating || "N/A"}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{purchase.decks.card_count} cards</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(purchase.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="gap-2">
                        <DownloadCloud className="h-4 w-4" />
                        Download .apkg
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <DownloadCloud className="h-4 w-4" />
                        Download .txt
                      </Button>
                      <Button variant="default">View Flashcards</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {purchases?.slice(0, 5).map((purchase) => (
              <div
                key={purchase.id}
                className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">
                      {purchase.decks.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      By {purchase.decks.profiles.username}
                    </p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {purchase.decks.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {purchase.decks.deck_tags?.map((tagObj, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded flex items-center gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {tagObj.tags.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{purchase.decks.avg_rating || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{purchase.decks.card_count} cards</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(purchase.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="gap-2">
                      <DownloadCloud className="h-4 w-4" />
                      Download .apkg
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <DownloadCloud className="h-4 w-4" />
                      Download .txt
                    </Button>
                    <Button variant="default">View Flashcards</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <div className="text-center py-12 bg-white rounded-lg border">
            <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No favorite decks yet</h3>
            <p className="text-gray-500 mb-4">
              Mark decks as favorites to access them quickly
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
