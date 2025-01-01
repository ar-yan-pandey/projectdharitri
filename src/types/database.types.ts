export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      cows: {
        Row: {
          id: string
          name: string
          age: number | null
          breed: string | null
          health_status: string
          created_at: string
          image_url: string | null
          description: string | null
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          age?: number | null
          breed?: string | null
          health_status?: string
          created_at?: string
          image_url?: string | null
          description?: string | null
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          age?: number | null
          breed?: string | null
          health_status?: string
          created_at?: string
          image_url?: string | null
          description?: string | null
          user_id?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          stock: number
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          stock?: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          stock?: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
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
  }
}
