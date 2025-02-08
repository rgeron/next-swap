export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          created_at: string;
          updated_at: string;
          purchaseddeckids: string[];
          likeddeckids: string[];
          followedcreators: string[];
          is_seller: boolean;
          stripe_connected_id: string | null;
          email: string;
        };
        Insert: {
          id: string;
          username: string;
          created_at?: string;
          updated_at?: string;
          purchaseddeckids?: string[];
          likeddeckids?: string[];
          followedcreators?: string[];
          is_seller?: boolean;
          stripe_connected_id?: string | null;
          email: string;
        };
        Update: {
          id?: string;
          username?: string;
          created_at?: string;
          updated_at?: string;
          purchaseddeckids?: string[];
          likeddeckids?: string[];
          followedcreators?: string[];
          is_seller?: boolean;
          stripe_connected_id?: string | null;
          email?: string;
        };
      };
      decks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number;
          cardcount: number;
          difficulty: string;
          creatorid: string;
          created_at: string;
          updated_at: string;
          flashcards_file_url: string | null;
          categories: string[];
          creator_avatar: string | null;
          cover_image_url: string | null;
          purchase_history: Json;
          total_reviews: number;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price: number;
          cardcount?: number;
          difficulty: string;
          creatorid: string;
          created_at?: string;
          updated_at?: string;
          flashcards_file_url?: string | null;
          categories?: string[];
          creator_avatar?: string | null;
          cover_image_url?: string | null;
          purchase_history?: Json;
          total_reviews?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          cardcount?: number;
          difficulty?: string;
          creatorid?: string;
          created_at?: string;
          updated_at?: string;
          flashcards_file_url?: string | null;
          categories?: string[];
          creator_avatar?: string | null;
          cover_image_url?: string | null;
          purchase_history?: Json;
          total_reviews?: number;
        };
      };
      reviews: {
        Row: {
          id: string;
          deck_id: string;
          user_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          deck_id: string;
          user_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          deck_id?: string;
          user_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
