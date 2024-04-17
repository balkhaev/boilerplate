export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      pack_rofls: {
        Row: {
          id: number
          pack_id: number
          rofl_id: number
        }
        Insert: {
          id?: number
          pack_id: number
          rofl_id: number
        }
        Update: {
          id?: number
          pack_id?: number
          rofl_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_pack_rofls_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "packs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_pack_rofls_rofl_id_fkey"
            columns: ["rofl_id"]
            isOneToOne: false
            referencedRelation: "rofls"
            referencedColumns: ["id"]
          },
        ]
      }
      packs: {
        Row: {
          created_at: string
          id: number
          slug: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          slug?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          slug?: string | null
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rofl_files: {
        Row: {
          bucket_name: string
          created_at: string
          id: string
          meme_id: number
          object_name: string
          preview_bucket_name: string | null
          preview_object_name: string | null
        }
        Insert: {
          bucket_name: string
          created_at?: string
          id?: string
          meme_id: number
          object_name: string
          preview_bucket_name?: string | null
          preview_object_name?: string | null
        }
        Update: {
          bucket_name?: string
          created_at?: string
          id?: string
          meme_id?: number
          object_name?: string
          preview_bucket_name?: string | null
          preview_object_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_memes_files_bucket_name_fkey"
            columns: ["bucket_name"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "public_memes_files_meme_id_fkey"
            columns: ["meme_id"]
            isOneToOne: false
            referencedRelation: "rofls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rofl_files_preview_bucket_name_fkey"
            columns: ["preview_bucket_name"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["name"]
          },
        ]
      }
      rofls: {
        Row: {
          cover_object_name: string | null
          created_at: string
          creator_id: string | null
          description: string | null
          id: number
          slug: string | null
          title: string | null
        }
        Insert: {
          cover_object_name?: string | null
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: number
          slug?: string | null
          title?: string | null
        }
        Update: {
          cover_object_name?: string | null
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: number
          slug?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_memes_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rofls_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      rus_to_eng2: {
        Args: {
          text_value: string
        }
        Returns: string
      }
      slugify: {
        Args: {
          text_value: string
        }
        Returns: string
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

