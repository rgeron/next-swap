export type Database = {
  profiles: {
    id: string;
    username: string;
    email: string;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
    purchased_deck_ids: string[];
    liked_deck_ids: string[];
    followed_creators: string[];
    my_followers: string[];
    is_seller: boolean;
    report_count: number;
    report_messages: string[];
    education_level: string;
    interests: string[];
  };

  decks: {
    id: string;
    creator_id: string;
    title: string;
    description: string | null;
    price: number;
    card_count: number;
    difficulty: string;
    average_rating: number;
    flashcards_file_url: string | null;
    categories: string[];
    creator_avatar: string | null;
    cover_image_url: string | null;
    report_count: number;
    report_messages: string[];
    created_at: string;
    updated_at: string;
  };

  reviews: {
    id: string;
    deck_id: string;
    writer_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    report_count: number;
    report_messages: string[];
  };

  sellers: {
    id: string;
    stripe_connected_id: string;
    created_at: string;
    updated_at: string;
    total_sales: number;
    total_earnings: number;
    money_on_stripe: number;

  };

  purchases: {
    id: string;
    buyer_id: string;
    deck_id: string;
    seller_id: string;
    amount_paid: number;
    stripe_transaction_id: string;
    created_at: string;
  };
};