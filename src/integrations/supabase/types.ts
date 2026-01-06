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
    PostgrestVersion: "13.0.5"
  }
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
            foreignKeyName: "categories_tags_id_cat_fkey"
            columns: ["id_cat"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
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
      categories_tags_copy: {
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
            foreignKeyName: "categories_tags_copy_id_area_fkey"
            columns: ["id_area"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id_area"]
          },
          {
            foreignKeyName: "categories_tags_copy_id_cat_fkey"
            columns: ["id_cat"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_tags_copy_id_src_fkey"
            columns: ["id_src"]
            isOneToOne: true
            referencedRelation: "main_table"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_tags_copy_tag_3_fkey"
            columns: ["tag_3"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_tags_copy_tag_4_fkey"
            columns: ["tag_4"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_tags_copy_tag_5_fkey"
            columns: ["tag_5"]
            isOneToOne: false
            referencedRelation: "sub_categories"
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
      conversation_participants: {
        Row: {
          conversation_id: string | null
          id: string
          joined_at: string | null
          user_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          id?: string
          joined_at?: string | null
          user_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          id?: string
          joined_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
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
      messages: {
        Row: {
          content: string | null
          conversation_id: string | null
          created_at: string | null
          id: string
          media_type: string | null
          media_url: string | null
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          media_type?: string | null
          media_url?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          media_type?: string | null
          media_url?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
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
      site_tags: {
        Row: {
          id: number
          id_src: number
          tag_type: number
          tag_value: number
        }
        Insert: {
          id?: number
          id_src: number
          tag_type: number
          tag_value: number
        }
        Update: {
          id?: number
          id_src?: number
          tag_type?: number
          tag_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_site_tags_id_src"
            columns: ["id_src"]
            isOneToOne: false
            referencedRelation: "categories_tags"
            referencedColumns: ["id_src"]
          },
          {
            foreignKeyName: "site_tags_id_src_fkey"
            columns: ["id_src"]
            isOneToOne: false
            referencedRelation: "main_table"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_tags_tag_value_fkey"
            columns: ["tag_value"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
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
      get_main: { Args: never; Returns: undefined }
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
