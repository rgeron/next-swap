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



-- Profiles Table (Main user table)
"profiles" (
  "id" uuid /// PRIMARY KEY REFERENCES auth.users,
  "username" /// text UNIQUE NOT NULL,
  "email" /// text UNIQUE NOT NULL,
  "created_at" /// timestamp with time zone DEFAULT now(),
  "updated_at" /// timestamp with time zone DEFAULT now(),
  "purchaseddeckids" /// uuid[], -- Array of purchased deck IDs
  "likeddeckids" /// uuid[], -- Array of liked deck IDs
  "followedcreators" /// uuid[], -- Array of followed creator profile IDs
  "is_seller" /// boolean DEFAULT false -- Flag to indicate if user is a seller
);

-- Sellers Table (Extension of profiles for sellers)
"sellers" (
  "id" uuid /// PRIMARY KEY REFERENCES profiles(id),
  "stripe_connected_id" /// text UNIQUE NOT NULL,
  "created_at" /// timestamp with time zone DEFAULT now(),
  "updated_at" /// timestamp with time zone DEFAULT now(),
  CONSTRAINT fk_profile FOREIGN KEY (id) REFERENCES profiles(id)
);

-- Decks Table
"decks" (
  "id" uuid /// PRIMARY KEY DEFAULT uuid_generate_v4(),
  "creatorid" uuid /// NOT NULL REFERENCES sellers(id),
  -- ... other fields remain the same
  CONSTRAINT fk_creator FOREIGN KEY (creatorid) REFERENCES sellers(id)
);

-- Reviews Table
"reviews" (
  "id" uuid /// PRIMARY KEY DEFAULT uuid_generate_v4(),
  "deck_id" uuid /// NOT NULL REFERENCES decks(id),
  "user_id" uuid /// NOT NULL REFERENCES profiles(id),
  -- ... other fields remain the same
  CONSTRAINT fk_deck FOREIGN KEY (deck_id) REFERENCES decks(id),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES profiles(id)
);