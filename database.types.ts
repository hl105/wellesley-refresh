// generated from supabase

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
      Menu: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          dhall: Database["public"]["Enums"]["dhall"] | null
          has_dairy: boolean | null
          has_egg: boolean | null
          has_fish: boolean | null
          has_peanut: boolean | null
          has_sesame: boolean | null
          has_shellfish: boolean | null
          has_soy: boolean | null
          has_tree_nut: boolean | null
          has_wheat: boolean | null
          id: number
          is_gluten_sensitive: boolean | null
          is_nutrigood: boolean | null
          is_vegan: boolean | null
          is_vegetarian: boolean | null
          may_contain_dairy: boolean | null
          may_contain_egg: boolean | null
          may_contain_peanut: boolean | null
          may_contain_sesame: boolean | null
          may_contain_soy: boolean | null
          may_contain_tree_nut: boolean | null
          may_contain_wheat: boolean | null
          meal: Database["public"]["Enums"]["meal"] | null
          name: string | null
          station: string | null
          stationOrder: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          dhall?: Database["public"]["Enums"]["dhall"] | null
          has_dairy?: boolean | null
          has_egg?: boolean | null
          has_fish?: boolean | null
          has_peanut?: boolean | null
          has_sesame?: boolean | null
          has_shellfish?: boolean | null
          has_soy?: boolean | null
          has_tree_nut?: boolean | null
          has_wheat?: boolean | null
          id?: number
          is_gluten_sensitive?: boolean | null
          is_nutrigood?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          may_contain_dairy?: boolean | null
          may_contain_egg?: boolean | null
          may_contain_peanut?: boolean | null
          may_contain_sesame?: boolean | null
          may_contain_soy?: boolean | null
          may_contain_tree_nut?: boolean | null
          may_contain_wheat?: boolean | null
          meal?: Database["public"]["Enums"]["meal"] | null
          name?: string | null
          station?: string | null
          stationOrder?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          dhall?: Database["public"]["Enums"]["dhall"] | null
          has_dairy?: boolean | null
          has_egg?: boolean | null
          has_fish?: boolean | null
          has_peanut?: boolean | null
          has_sesame?: boolean | null
          has_shellfish?: boolean | null
          has_soy?: boolean | null
          has_tree_nut?: boolean | null
          has_wheat?: boolean | null
          id?: number
          is_gluten_sensitive?: boolean | null
          is_nutrigood?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          may_contain_dairy?: boolean | null
          may_contain_egg?: boolean | null
          may_contain_peanut?: boolean | null
          may_contain_sesame?: boolean | null
          may_contain_soy?: boolean | null
          may_contain_tree_nut?: boolean | null
          may_contain_wheat?: boolean | null
          meal?: Database["public"]["Enums"]["meal"] | null
          name?: string | null
          station?: string | null
          stationOrder?: number | null
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
      dhall: "Bates" | "Stone D" | "Lulu" | "Tower"
      meal: "breakfast" | "lunch" | "dinner"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
