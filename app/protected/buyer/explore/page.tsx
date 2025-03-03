import { createClient } from "@/utils/supabase/server";

export default async function ExplorePage() {
  const supabase = await createClient();

  // Fetch featured decks
  const { data: featuredDecks } = await supabase
    .from("decks")
    .select("*, profiles(username, avatar_url)")
    .eq("is_published", true)
    .order("sales_count", { ascending: false })
    .limit(6);

  // Fetch newest decks
  const { data: newestDecks } = await supabase
    .from("decks")
    .select("*, profiles(username, avatar_url)")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  // Fetch popular tags
  const { data: popularTags } = await supabase
    .from("tags")
    .select("name, id, deck_count")
    .order("deck_count", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-6">Explore Flashcard Decks</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">
              Welcome to the Flashcard Marketplace
            </h2>
            <p className="mb-4">
              Discover, learn, and master new subjects with our curated
              flashcard decks.
            </p>
            <div className="flex gap-3">
              <button className="bg-white text-blue-700 px-4 py-2 rounded-md font-medium">
                Browse All
              </button>
              <button className="bg-blue-600 text-white border border-white px-4 py-2 rounded-md font-medium">
                Popular Tags
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-medium text-blue-800 mb-3">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags?.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-100"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Best Sellers</h2>
          <button className="text-blue-600 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredDecks?.map((deck) => (
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
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {deck.card_count} cards
                </span>
                <button className="text-blue-600 text-sm font-medium">
                  View Deck
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Arrivals</h2>
          <button className="text-blue-600 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {newestDecks?.map((deck) => (
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
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {deck.card_count} cards
                </span>
                <button className="text-blue-600 text-sm font-medium">
                  View Deck
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
