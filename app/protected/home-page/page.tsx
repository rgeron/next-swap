export default async function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Welcome to Flashcards</h1>
      <p className="text-muted-foreground">
        A flashcard is a card bearing information on both sides, used for teaching and self-testing.
        Browse our marketplace to find decks that match your learning goals.
      </p>
    </div>
  );
}
