export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      avatar_configs: {
        Row: {
          accessories: Json | null
          bottom: string | null
          created_at: string
          credits: number | null
          hair_color: string | null
          hair_style: string | null
          id: string
          pet: string | null
          position_x: number | null
          position_y: number | null
          room_decor: Json | null
          shoes: string | null
          top: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accessories?: Json | null
          bottom?: string | null
          created_at?: string
          credits?: number | null
          hair_color?: string | null
          hair_style?: string | null
          id?: string
          pet?: string | null
          position_x?: number | null
          position_y?: number | null
          room_decor?: Json | null
          shoes?: string | null
          top?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accessories?: Json | null
          bottom?: string | null
          created_at?: string
          credits?: number | null
          hair_color?: string | null
          hair_style?: string | null
          id?: string
          pet?: string | null
          position_x?: number | null
          position_y?: number | null
          room_decor?: Json | null
          shoes?: string | null
          top?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      avatar_items: {
        Row: {
          cost: number
          created_at: string
          description: string | null
          frame_config: Json | null
          id: string
          image_path: string | null
          item_id: string
          item_type: string
          name: string
          sprite_path: string | null
        }
        Insert: {
          cost: number
          created_at?: string
          description?: string | null
          frame_config?: Json | null
          id?: string
          image_path?: string | null
          item_id: string
          item_type: string
          name: string
          sprite_path?: string | null
        }
        Update: {
          cost?: number
          created_at?: string
          description?: string | null
          frame_config?: Json | null
          id?: string
          image_path?: string | null
          item_id?: string
          item_type?: string
          name?: string
          sprite_path?: string | null
        }
        Relationships: []
      }
      avatar_purchases: {
        Row: {
          id: string
          item_id: string
          item_type: string
          purchased_at: string
          user_id: string
        }
        Insert: {
          id?: string
          item_id: string
          item_type: string
          purchased_at?: string
          user_id: string
        }
        Update: {
          id?: string
          item_id?: string
          item_type?: string
          purchased_at?: string
          user_id?: string
        }
        Relationships: []
      }
      board_cards: {
        Row: {
          assignee_id: string | null
          board_id: string
          category: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          is_completed: boolean | null
          kill_count: number
          last_activity_at: string | null
          loss_count: number
          position: number
          priority: string | null
          stage_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assignee_id?: string | null
          board_id: string
          category?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          kill_count?: number
          last_activity_at?: string | null
          loss_count?: number
          position: number
          priority?: string | null
          stage_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assignee_id?: string | null
          board_id?: string
          category?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          kill_count?: number
          last_activity_at?: string | null
          loss_count?: number
          position?: number
          priority?: string | null
          stage_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "board_cards_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "board_cards_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "board_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      board_sections: {
        Row: {
          created_at: string
          id: string
          is_collapsed: boolean
          name: string
          position: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_collapsed?: boolean
          name: string
          position?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_collapsed?: boolean
          name?: string
          position?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      board_shares: {
        Row: {
          board_id: string
          created_at: string | null
          id: string
          permission_level: string
          user_email: string
        }
        Insert: {
          board_id: string
          created_at?: string | null
          id?: string
          permission_level: string
          user_email: string
        }
        Update: {
          board_id?: string
          created_at?: string | null
          id?: string
          permission_level?: string
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_shares_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
        ]
      }
      board_stages: {
        Row: {
          board_id: string
          created_at: string | null
          id: string
          is_graveyard: boolean
          name: string
          position: number
        }
        Insert: {
          board_id: string
          created_at?: string | null
          id?: string
          is_graveyard?: boolean
          name: string
          position: number
        }
        Update: {
          board_id?: string
          created_at?: string | null
          id?: string
          is_graveyard?: boolean
          name?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "board_stages_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
        ]
      }
      boards: {
        Row: {
          created_at: string | null
          id: string
          is_public: boolean | null
          name: string
          section_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          section_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          section_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "boards_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "board_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      card_messages: {
        Row: {
          card_id: string
          created_at: string
          duration: number | null
          file_path: string
          id: string
          message_type: string
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          duration?: number | null
          file_path: string
          id?: string
          message_type: string
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          duration?: number | null
          file_path?: string
          id?: string
          message_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_messages_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "board_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_tags: {
        Row: {
          card_id: string
          color: string
          created_at: string | null
          id: string
          tag_name: string
        }
        Insert: {
          card_id: string
          color?: string
          created_at?: string | null
          id?: string
          tag_name: string
        }
        Update: {
          card_id?: string
          color?: string
          created_at?: string | null
          id?: string
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_tags_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "board_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      glow_settings: {
        Row: {
          board_green_color: string
          board_red_color: string
          board_red_minutes: number
          board_yellow_color: string
          board_yellow_minutes: number
          card_green_color: string
          card_red_color: string
          card_red_minutes: number
          card_yellow_color: string
          card_yellow_minutes: number
          created_at: string
          enabled: boolean
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          board_green_color?: string
          board_red_color?: string
          board_red_minutes?: number
          board_yellow_color?: string
          board_yellow_minutes?: number
          card_green_color?: string
          card_red_color?: string
          card_red_minutes?: number
          card_yellow_color?: string
          card_yellow_minutes?: number
          created_at?: string
          enabled?: boolean
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          board_green_color?: string
          board_red_color?: string
          board_red_minutes?: number
          board_yellow_color?: string
          board_yellow_minutes?: number
          card_green_color?: string
          card_red_color?: string
          card_red_minutes?: number
          card_yellow_color?: string
          card_yellow_minutes?: number
          created_at?: string
          enabled?: boolean
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          card_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          card_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          card_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
