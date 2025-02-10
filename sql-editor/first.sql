-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    purchased_deck_ids UUID[] DEFAULT '{}',
    liked_deck_ids UUID[] DEFAULT '{}',
    followed_creators UUID[] DEFAULT '{}',
    my_followers UUID[] DEFAULT '{}',
    is_seller BOOLEAN DEFAULT false,
    report_count INTEGER DEFAULT 0,
    report_messages TEXT[] DEFAULT '{}',
    education_level TEXT,
    interests TEXT[] DEFAULT '{}'
);

-- Sellers Table
CREATE TABLE sellers (
    id UUID PRIMARY KEY REFERENCES profiles(id),
    stripe_connected_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    total_sales INTEGER DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0,
    money_on_stripe DECIMAL(10,2) DEFAULT 0
);

-- Decks Table
CREATE TABLE decks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES sellers(id),
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    card_count INTEGER DEFAULT 0,
    difficulty TEXT,
    average_rating DECIMAL(3,2) DEFAULT 0,
    flashcards_file_url TEXT,
    categories TEXT[] DEFAULT '{}',
    creator_avatar TEXT,
    cover_image_url TEXT,
    report_count INTEGER DEFAULT 0,
    report_messages TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
    writer_id UUID REFERENCES profiles(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    report_count INTEGER DEFAULT 0,
    report_messages TEXT[] DEFAULT '{}'
);

-- Purchases Table
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID REFERENCES profiles(id),
    deck_id UUID REFERENCES decks(id),
    seller_id UUID REFERENCES sellers(id),
    amount_paid DECIMAL(10,2) NOT NULL,
    stripe_transaction_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_sellers_updated_at
    BEFORE UPDATE ON sellers
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_decks_updated_at
    BEFORE UPDATE ON decks
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Profile can only be inserted by owner"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Sellers Policies
CREATE POLICY "Seller profiles are viewable by everyone"
ON sellers FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Sellers can update own profile"
ON sellers FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Seller profile can only be inserted by owner"
ON sellers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Decks Policies
CREATE POLICY "Decks are viewable by everyone"
ON decks FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Creators can insert their decks"
ON decks FOR INSERT
TO authenticated
WITH CHECK (creator_id IN (
    SELECT id FROM sellers WHERE id = auth.uid()
));

CREATE POLICY "Creators can update their decks"
ON decks FOR UPDATE
TO authenticated
USING (creator_id = auth.uid());

CREATE POLICY "Creators can delete their decks"
ON decks FOR DELETE
TO authenticated
USING (creator_id = auth.uid());

-- Reviews Policies
CREATE POLICY "Reviews are viewable by everyone"
ON reviews FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert reviews"
ON reviews FOR INSERT
TO authenticated
WITH CHECK (
    writer_id = auth.uid() AND
    deck_id IN (
        SELECT unnest(purchased_deck_ids)
        FROM profiles
        WHERE id = auth.uid()
    )
);

CREATE POLICY "Users can update own reviews"
ON reviews FOR UPDATE
TO authenticated
USING (writer_id = auth.uid());

CREATE POLICY "Users can delete own reviews"
ON reviews FOR DELETE
TO authenticated
USING (writer_id = auth.uid());

-- Purchases Policies
CREATE POLICY "Users can view own purchases"
ON purchases FOR SELECT
TO authenticated
USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "System can insert purchases"
ON purchases FOR INSERT
TO authenticated
WITH CHECK (buyer_id = auth.uid());