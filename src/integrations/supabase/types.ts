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
      address_book: {
        Row: {
          ala: string | null
          circondario: string | null
          cisia: string | null
          citta: string | null
          codice_fiscale: string | null
          created_at: string
          department: string | null
          distretto: string | null
          first_name: string | null
          id: number
          internet_email: string | null
          jobtitle: string | null
          last_name: string | null
          local_business: string | null
          phone_number_business: string | null
          piano: string | null
          profile_status: string | null
          region: string | null
          site: string | null
          stanza: string | null
          ufficio: string | null
        }
        Insert: {
          ala?: string | null
          circondario?: string | null
          cisia?: string | null
          citta?: string | null
          codice_fiscale?: string | null
          created_at?: string
          department?: string | null
          distretto?: string | null
          first_name?: string | null
          id?: number
          internet_email?: string | null
          jobtitle?: string | null
          last_name?: string | null
          local_business?: string | null
          phone_number_business?: string | null
          piano?: string | null
          profile_status?: string | null
          region?: string | null
          site?: string | null
          stanza?: string | null
          ufficio?: string | null
        }
        Update: {
          ala?: string | null
          circondario?: string | null
          cisia?: string | null
          citta?: string | null
          codice_fiscale?: string | null
          created_at?: string
          department?: string | null
          distretto?: string | null
          first_name?: string | null
          id?: number
          internet_email?: string | null
          jobtitle?: string | null
          last_name?: string | null
          local_business?: string | null
          phone_number_business?: string | null
          piano?: string | null
          profile_status?: string | null
          region?: string | null
          site?: string | null
          stanza?: string | null
          ufficio?: string | null
        }
        Relationships: []
      }
      areas: {
        Row: {
          area: string | null
          id: number
          id_area: number | null
        }
        Insert: {
          area?: string | null
          id?: number
          id_area?: number | null
        }
        Update: {
          area?: string | null
          id?: number
          id_area?: number | null
        }
        Relationships: []
      }
      auth_users: {
        Row: {
          created_at: string
          email: string
          id: string
          password_hash: string
        }
        Insert: {
          created_at: string
          email: string
          id: string
          password_hash: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          category: string | null
          id: number
          id_area: number | null
        }
        Insert: {
          category?: string | null
          id?: number
          id_area?: number | null
        }
        Update: {
          category?: string | null
          id?: number
          id_area?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "caegories_id_area_fkey"
            columns: ["id_area"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id_area"]
          },
        ]
      }
      categories_tags: {
        Row: {
          AI_summary: string | null
          AI_think: string | null
          id: number
          id_area: number | null
          id_cat: number | null
          id_provider: number | null
          id_src: number
          ratings: number | null
          tag_3: number | null
          tag_4: number | null
          tag_5: number | null
        }
        Insert: {
          AI_summary?: string | null
          AI_think?: string | null
          id?: number
          id_area?: number | null
          id_cat?: number | null
          id_provider?: number | null
          id_src: number
          ratings?: number | null
          tag_3?: number | null
          tag_4?: number | null
          tag_5?: number | null
        }
        Update: {
          AI_summary?: string | null
          AI_think?: string | null
          id?: number
          id_area?: number | null
          id_cat?: number | null
          id_provider?: number | null
          id_src?: number
          ratings?: number | null
          tag_3?: number | null
          tag_4?: number | null
          tag_5?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "caegories_tags_id_area_fkey"
            columns: ["id_area"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id_area"]
          },
          {
            foreignKeyName: "categories_tags_id_src_fkey"
            columns: ["id_src"]
            isOneToOne: true
            referencedRelation: "main_table"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_links: {
        Row: {
          collection_id: string
          created_at: string | null
          link_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          link_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          link_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_links_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_links_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "links"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      context_types: {
        Row: {
          context_id: number
          description: string | null
          name: string
        }
        Insert: {
          context_id?: number
          description?: string | null
          name: string
        }
        Update: {
          context_id?: number
          description?: string | null
          name?: string
        }
        Relationships: []
      }
      event_family: {
        Row: {
          event_family: string
          id: number
        }
        Insert: {
          event_family: string
          id?: number
        }
        Update: {
          event_family?: string
          id?: number
        }
        Relationships: []
      }
      event_log: {
        Row: {
          event_data: string | null
          id: number
          id_event_family: number | null
          id_event_type: number | null
          user_id: string | null
        }
        Insert: {
          event_data?: string | null
          id?: number
          id_event_family?: number | null
          id_event_type?: number | null
          user_id?: string | null
        }
        Update: {
          event_data?: string | null
          id?: number
          id_event_family?: number | null
          id_event_type?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_log_id_event_family_fkey"
            columns: ["id_event_family"]
            isOneToOne: false
            referencedRelation: "event_family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_log_id_event_type_fkey"
            columns: ["id_event_type"]
            isOneToOne: false
            referencedRelation: "event_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "auth_users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_type: {
        Row: {
          event_description: string | null
          event_type: string | null
          id: number
          id_event_family: number
        }
        Insert: {
          event_description?: string | null
          event_type?: string | null
          id?: number
          id_event_family: number
        }
        Update: {
          event_description?: string | null
          event_type?: string | null
          id?: number
          id_event_family?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_type_id_event_family_fkey"
            columns: ["id_event_family"]
            isOneToOne: false
            referencedRelation: "event_family"
            referencedColumns: ["id"]
          },
        ]
      }
      function_types: {
        Row: {
          description: string | null
          function_id: number
          name: string
        }
        Insert: {
          description?: string | null
          function_id?: number
          name: string
        }
        Update: {
          description?: string | null
          function_id?: number
          name?: string
        }
        Relationships: []
      }
      guestbook: {
        Row: {
          created_at: string
          id: number
          message: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          name?: string | null
        }
        Relationships: []
      }
      links: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          tags: string[] | null
          title: string
          updated_at: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      lists_items: {
        Row: {
          id: number
          id_list: number | null
          id_src: number | null
        }
        Insert: {
          id?: number
          id_list?: number | null
          id_src?: number | null
        }
        Update: {
          id?: number
          id_list?: number | null
          id_src?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "favorite_list_items_id_list_fkey"
            columns: ["id_list"]
            isOneToOne: false
            referencedRelation: "lists_users"
            referencedColumns: ["id"]
          },
        ]
      }
      lists_users: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          id_user: string
          modified_at: string | null
          name: string
          public: boolean | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          id_user: string
          modified_at?: string | null
          name: string
          public?: boolean | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          id_user?: string
          modified_at?: string | null
          name?: string
          public?: boolean | null
        }
        Relationships: []
      }
      main_category: {
        Row: {
          cat_name: string
          id: number
        }
        Insert: {
          cat_name: string
          id?: number
        }
        Update: {
          cat_name?: string
          id?: number
        }
        Relationships: []
      }
      main_table: {
        Row: {
          description: string | null
          icon: string | null
          id: number
          image: string | null
          logo: string | null
          name: string | null
          screenshot_img: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          description?: string | null
          icon?: string | null
          id?: never
          image?: string | null
          logo?: string | null
          name?: string | null
          screenshot_img?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          description?: string | null
          icon?: string | null
          id?: never
          image?: string | null
          logo?: string | null
          name?: string | null
          screenshot_img?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
      prod_sub_category: {
        Row: {
          id: number
          sub_cat_name: string
        }
        Insert: {
          id?: number
          sub_cat_name: string
        }
        Update: {
          id?: number
          sub_cat_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          descriptiom: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          descriptiom?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          descriptiom?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      projects_workflows: {
        Row: {
          description: string | null
          id: number
          id_app: number | null
          id_list: number | null
          id_project: number | null
          workflow: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          id_app?: number | null
          id_list?: number | null
          id_project?: number | null
          workflow?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          id_app?: number | null
          id_list?: number | null
          id_project?: number | null
          workflow?: string | null
        }
        Relationships: []
      }
      providers: {
        Row: {
          id: number
          name: string
          url: string
        }
        Insert: {
          id?: number
          name: string
          url: string
        }
        Update: {
          id?: number
          name?: string
          url?: string
        }
        Relationships: []
      }
      rel_sites_users: {
        Row: {
          cache_redis: boolean | null
          data_creation: string | null
          data_update: string | null
          id: number
          id_src: number | null
          user_id: string | null
        }
        Insert: {
          cache_redis?: boolean | null
          data_creation?: string | null
          data_update?: string | null
          id?: never
          id_src?: number | null
          user_id?: string | null
        }
        Update: {
          cache_redis?: boolean | null
          data_creation?: string | null
          data_update?: string | null
          id?: never
          id_src?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rel_sites_users_id_src_fkey"
            columns: ["id_src"]
            isOneToOne: false
            referencedRelation: "sub_main_table"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_types: {
        Row: {
          description: string | null
          name: string
          resource_id: number
        }
        Insert: {
          description?: string | null
          name: string
          resource_id?: number
        }
        Update: {
          description?: string | null
          name?: string
          resource_id?: number
        }
        Relationships: []
      }
      site_classifications: {
        Row: {
          context_id: number | null
          function_id: number | null
          id: number
          resource_id: number | null
          site_id: number | null
        }
        Insert: {
          context_id?: number | null
          function_id?: number | null
          id?: number
          resource_id?: number | null
          site_id?: number | null
        }
        Update: {
          context_id?: number | null
          function_id?: number | null
          id?: number
          resource_id?: number | null
          site_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "site_classifications_context_id_fkey"
            columns: ["context_id"]
            isOneToOne: false
            referencedRelation: "context_types"
            referencedColumns: ["context_id"]
          },
          {
            foreignKeyName: "site_classifications_function_id_fkey"
            columns: ["function_id"]
            isOneToOne: false
            referencedRelation: "function_types"
            referencedColumns: ["function_id"]
          },
          {
            foreignKeyName: "site_classifications_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resource_types"
            referencedColumns: ["resource_id"]
          },
        ]
      }
      sub_categories: {
        Row: {
          id: number
          id_category: number | null
          sub_category: string | null
        }
        Insert: {
          id?: number
          id_category?: number | null
          sub_category?: string | null
        }
        Update: {
          id?: number
          id_category?: number | null
          sub_category?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_categories_id_fkey"
            columns: ["id_category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_main_table: {
        Row: {
          accessible: boolean | null
          AI: boolean | null
          created_timestamp: string | null
          domain_exists: boolean | null
          html_content_exists: boolean | null
          id: number
          id_src: number | null
          is_public: boolean | null
          secure: boolean | null
          status_code: number | null
          type: string | null
          update_timestamp: string | null
          user_id: string | null
          valid_url: boolean | null
        }
        Insert: {
          accessible?: boolean | null
          AI?: boolean | null
          created_timestamp?: string | null
          domain_exists?: boolean | null
          html_content_exists?: boolean | null
          id?: never
          id_src?: number | null
          is_public?: boolean | null
          secure?: boolean | null
          status_code?: number | null
          type?: string | null
          update_timestamp?: string | null
          user_id?: string | null
          valid_url?: boolean | null
        }
        Update: {
          accessible?: boolean | null
          AI?: boolean | null
          created_timestamp?: string | null
          domain_exists?: boolean | null
          html_content_exists?: boolean | null
          id?: never
          id_src?: number | null
          is_public?: boolean | null
          secure?: boolean | null
          status_code?: number | null
          type?: string | null
          update_timestamp?: string | null
          user_id?: string | null
          valid_url?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_main_table_id_src_fkey"
            columns: ["id_src"]
            isOneToOne: false
            referencedRelation: "main_table"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_main: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
