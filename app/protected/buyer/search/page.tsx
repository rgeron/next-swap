import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { createClient } from "@/utils/supabase/server";
import { Filter, Search, SlidersHorizontal, Star, Tag, X } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    tag?: string;
    min_price?: string;
    max_price?: string;
    difficulty?: string;
  };
}) {
  const supabase = await createClient();
  const query = searchParams.q || "";
  const tag = searchParams.tag || "";
  const minPrice = Number(searchParams.min_price) || 0;
  const maxPrice = Number(searchParams.max_price) || 100;
  const difficulty = searchParams.difficulty || "";

  // Build the query
  let deckQuery = supabase
    .from("decks")
    .select("*, profiles(username, avatar_url), deck_tags(tags(name))")
    .eq("is_published", true);

  // Apply search query if provided
  if (query) {
    deckQuery = deckQuery.textSearch("title", query, {
      type: "websearch",
      config: "english",
    });
  }

  // Apply tag filter if provided
  if (tag) {
    deckQuery = deckQuery.eq("deck_tags.tags.name", tag);
  }

  // Apply price filter
  deckQuery = deckQuery.gte("price", minPrice).lte("price", maxPrice);

  // Apply difficulty filter if provided
  if (difficulty) {
    deckQuery = deckQuery.eq("difficulty", difficulty);
  }

  // Execute the query
  const { data: decks, error } = await deckQuery.limit(20);

  // Fetch popular tags
  const { data: popularTags } = await supabase
    .from("tags")
    .select("name, id, deck_count")
    .order("deck_count", { ascending: false })
    .limit(15);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {query ? `Search results for "${query}"` : "Browse Decks"}
        </h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Decks</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">${minPrice}</span>
                  <span className="text-sm">${maxPrice}</span>
                </div>
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  max={100}
                  step={1}
                  className="my-4"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Difficulty</h3>
                <Select defaultValue={difficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Rating</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">★★★★★ (5+)</SelectItem>
                    <SelectItem value="4">★★★★☆ (4+)</SelectItem>
                    <SelectItem value="3">★★★☆☆ (3+)</SelectItem>
                    <SelectItem value="2">★★☆☆☆ (2+)</SelectItem>
                    <SelectItem value="1">★☆☆☆☆ (1+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {popularTags?.map((tag) => (
          <Button
            key={tag.id}
            variant="outline"
            size="sm"
            className="rounded-full gap-1 text-sm"
          >
            <Tag className="h-3 w-3" />
            {tag.name}
          </Button>
        ))}
      </div>

      {/* Active filters */}
      {(query || tag || difficulty || minPrice > 0 || maxPrice < 100) && (
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="text-sm text-gray-500 mr-2 flex items-center">
            <Filter className="h-4 w-4 mr-1" /> Active filters:
          </div>

          {query && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1 text-sm"
            >
              Search: {query}
              <X className="h-3 w-3 ml-1" />
            </Button>
          )}

          {tag && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1 text-sm"
            >
              Tag: {tag}
              <X className="h-3 w-3 ml-1" />
            </Button>
          )}

          {difficulty && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1 text-sm"
            >
              Difficulty: {difficulty}
              <X className="h-3 w-3 ml-1" />
            </Button>
          )}

          {(minPrice > 0 || maxPrice < 100) && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1 text-sm"
            >
              Price: ${minPrice} - ${maxPrice}
              <X className="h-3 w-3 ml-1" />
            </Button>
          )}

          <Button variant="ghost" size="sm" className="text-blue-600">
            Clear all
          </Button>
        </div>
      )}

      {/* Search results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {decks?.map((deck) => (
          <div
            key={deck.id}
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{deck.title}</h3>
                <p className="text-sm text-gray-500">
                  By {deck.profiles.username}
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                ${deck.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {deck.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {deck.deck_tags?.map((tagObj, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                >
                  {tagObj.tags.name}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm">{deck.avg_rating || "N/A"}</span>
              </div>
              <button className="text-blue-600 text-sm font-medium">
                View Deck
              </button>
            </div>
          </div>
        ))}
      </div>

      {decks?.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline">Clear all filters</Button>
        </div>
      )}
    </div>
  );
}
