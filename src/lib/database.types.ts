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
      products: {
        Row: {
          id: number
          created_at: string
          name: string
          description: string | null
          price: number
          category: string | null
          image_url: string | null
          buying_link: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          description?: string | null
          price: number
          category?: string | null
          image_url?: string | null
          buying_link?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          description?: string | null
          price?: number
          category?: string | null
          image_url?: string | null
          buying_link?: string | null
        }
      }
    }
  }
}
