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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          amount: number
          category: string | null
          company_id: string
          created_at: string
          created_by: string | null
          customer_id: string | null
          description: string
          due_date: string
          id: string
          installment_group: string | null
          installment_number: number | null
          installment_total: number | null
          kind: string
          notes: string | null
          paid_date: string | null
          status: string
          supplier_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          category?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          description: string
          due_date: string
          id?: string
          installment_group?: string | null
          installment_number?: number | null
          installment_total?: number | null
          kind: string
          notes?: string | null
          paid_date?: string | null
          status?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          description?: string
          due_date?: string
          id?: string
          installment_group?: string | null
          installment_number?: number | null
          installment_total?: number | null
          kind?: string
          notes?: string | null
          paid_date?: string | null
          status?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          company_id: string
          created_at: string
          description: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          staff_id: string | null
          staff_name: string | null
          staff_role: string | null
          user_id: string | null
          user_name: string | null
          user_role: string | null
        }
        Insert: {
          action: string
          company_id: string
          created_at?: string
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          staff_id?: string | null
          staff_name?: string | null
          staff_role?: string | null
          user_id?: string | null
          user_name?: string | null
          user_role?: string | null
        }
        Update: {
          action?: string
          company_id?: string
          created_at?: string
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          staff_id?: string | null
          staff_name?: string | null
          staff_role?: string | null
          user_id?: string | null
          user_name?: string | null
          user_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_reservations: {
        Row: {
          cart_id: string
          company_id: string
          created_at: string
          id: string
          operator_id: string | null
          operator_name: string | null
          product_id: string
          quantity: number
          reserved_by: string | null
          source: string
          updated_at: string
        }
        Insert: {
          cart_id: string
          company_id: string
          created_at?: string
          id?: string
          operator_id?: string | null
          operator_name?: string | null
          product_id: string
          quantity: number
          reserved_by?: string | null
          source?: string
          updated_at?: string
        }
        Update: {
          cart_id?: string
          company_id?: string
          created_at?: string
          id?: string
          operator_id?: string | null
          operator_name?: string | null
          product_id?: string
          quantity?: number
          reserved_by?: string | null
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_reservations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_reservations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_movements: {
        Row: {
          amount: number
          authorized_by_name: string | null
          authorized_by_staff_id: string | null
          cash_session_id: string
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          reason: string | null
          type: string
        }
        Insert: {
          amount: number
          authorized_by_name?: string | null
          authorized_by_staff_id?: string | null
          cash_session_id: string
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string | null
          type: string
        }
        Update: {
          amount?: number
          authorized_by_name?: string | null
          authorized_by_staff_id?: string | null
          cash_session_id?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "cash_movements_authorized_by_staff_id_fkey"
            columns: ["authorized_by_staff_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_movements_cash_session_id_fkey"
            columns: ["cash_session_id"]
            isOneToOne: false
            referencedRelation: "cash_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_sessions: {
        Row: {
          closed_at: string | null
          closed_by: string | null
          closing_amount: number | null
          company_id: string
          difference: number | null
          expected_amount: number | null
          id: string
          notes: string | null
          opened_at: string
          opened_by: string
          opening_amount: number
          operator_id: string | null
          operator_name: string | null
          status: string
        }
        Insert: {
          closed_at?: string | null
          closed_by?: string | null
          closing_amount?: number | null
          company_id: string
          difference?: number | null
          expected_amount?: number | null
          id?: string
          notes?: string | null
          opened_at?: string
          opened_by: string
          opening_amount?: number
          operator_id?: string | null
          operator_name?: string | null
          status?: string
        }
        Update: {
          closed_at?: string | null
          closed_by?: string | null
          closing_amount?: number | null
          company_id?: string
          difference?: number | null
          expected_amount?: number | null
          id?: string
          notes?: string | null
          opened_at?: string
          opened_by?: string
          opening_amount?: number
          operator_id?: string | null
          operator_name?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "cash_sessions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_sessions_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      comanda_items: {
        Row: {
          addons: Json
          comanda_id: string
          created_at: string
          id: string
          kds_done_at: string | null
          kds_ready_at: string | null
          kds_started_at: string | null
          kds_status: string
          notes: string | null
          product_id: string | null
          product_name: string
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          addons?: Json
          comanda_id: string
          created_at?: string
          id?: string
          kds_done_at?: string | null
          kds_ready_at?: string | null
          kds_started_at?: string | null
          kds_status?: string
          notes?: string | null
          product_id?: string | null
          product_name: string
          quantity?: number
          subtotal: number
          unit_price: number
        }
        Update: {
          addons?: Json
          comanda_id?: string
          created_at?: string
          id?: string
          kds_done_at?: string | null
          kds_ready_at?: string | null
          kds_started_at?: string | null
          kds_status?: string
          notes?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "comanda_items_comanda_id_fkey"
            columns: ["comanda_id"]
            isOneToOne: false
            referencedRelation: "comandas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comanda_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      comandas: {
        Row: {
          closed_at: string | null
          company_id: string
          created_at: string
          id: string
          identifier: string
          notes: string | null
          payment_method: string | null
          status: string
          total: number
        }
        Insert: {
          closed_at?: string | null
          company_id: string
          created_at?: string
          id?: string
          identifier: string
          notes?: string | null
          payment_method?: string | null
          status?: string
          total?: number
        }
        Update: {
          closed_at?: string | null
          company_id?: string
          created_at?: string
          id?: string
          identifier?: string
          notes?: string | null
          payment_method?: string | null
          status?: string
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "comandas_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          business_type: Database["public"]["Enums"]["business_type"]
          created_at: string
          created_by: string
          crediario_late_fee_percent: number
          crediario_late_fee_period: string
          document: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          payment_settings: Json | null
          phone: string | null
          printer_settings: Json | null
          settings: Json
          updated_at: string
        }
        Insert: {
          address?: string | null
          business_type?: Database["public"]["Enums"]["business_type"]
          created_at?: string
          created_by: string
          crediario_late_fee_percent?: number
          crediario_late_fee_period?: string
          document?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          payment_settings?: Json | null
          phone?: string | null
          printer_settings?: Json | null
          settings?: Json
          updated_at?: string
        }
        Update: {
          address?: string | null
          business_type?: Database["public"]["Enums"]["business_type"]
          created_at?: string
          created_by?: string
          crediario_late_fee_percent?: number
          crediario_late_fee_period?: string
          document?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          payment_settings?: Json | null
          phone?: string | null
          printer_settings?: Json | null
          settings?: Json
          updated_at?: string
        }
        Relationships: []
      }
      company_bank_accounts: {
        Row: {
          account: string
          account_digit: string | null
          account_type: string
          agency: string
          agency_digit: string | null
          bank_code: string
          bank_ispb: string | null
          bank_name: string
          company_id: string
          created_at: string
          holder_document: string | null
          holder_name: string | null
          holder_type: string
          id: string
          is_default: boolean
          pix_key: string | null
          pix_key_type: string | null
          updated_at: string
        }
        Insert: {
          account: string
          account_digit?: string | null
          account_type: string
          agency: string
          agency_digit?: string | null
          bank_code: string
          bank_ispb?: string | null
          bank_name: string
          company_id: string
          created_at?: string
          holder_document?: string | null
          holder_name?: string | null
          holder_type: string
          id?: string
          is_default?: boolean
          pix_key?: string | null
          pix_key_type?: string | null
          updated_at?: string
        }
        Update: {
          account?: string
          account_digit?: string | null
          account_type?: string
          agency?: string
          agency_digit?: string | null
          bank_code?: string
          bank_ispb?: string | null
          bank_name?: string
          company_id?: string
          created_at?: string
          holder_document?: string | null
          holder_name?: string | null
          holder_type?: string
          id?: string
          is_default?: boolean
          pix_key?: string | null
          pix_key_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_bank_accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_members: {
        Row: {
          company_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["company_role"]
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["company_role"]
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["company_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_members_user_profile_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crediario_entries: {
        Row: {
          amount: number
          company_id: string
          created_at: string
          created_by: string | null
          customer_id: string
          description: string
          due_date: string | null
          id: string
          is_late_fee: boolean
          kind: string
          notes: string | null
          parent_entry_id: string | null
          reference_date: string
          sale_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          company_id: string
          created_at?: string
          created_by?: string | null
          customer_id: string
          description?: string
          due_date?: string | null
          id?: string
          is_late_fee?: boolean
          kind: string
          notes?: string | null
          parent_entry_id?: string | null
          reference_date?: string
          sale_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          company_id?: string
          created_at?: string
          created_by?: string | null
          customer_id?: string
          description?: string
          due_date?: string | null
          id?: string
          is_late_fee?: boolean
          kind?: string
          notes?: string | null
          parent_entry_id?: string | null
          reference_date?: string
          sale_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crediario_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crediario_entries_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crediario_entries_parent_entry_id_fkey"
            columns: ["parent_entry_id"]
            isOneToOne: false
            referencedRelation: "crediario_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crediario_entries_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          company_id: string
          created_at: string
          credit_limit: number | null
          document: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          credit_limit?: number | null
          document?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          credit_limit?: number | null
          document?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      product_addons: {
        Row: {
          created_at: string
          id: string
          name: string
          price: number
          product_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          price?: number
          product_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          price?: number
          product_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_addons_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          barcode: string | null
          category: string | null
          company_id: string
          cost_price: number
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_prepared: boolean
          is_promotion: boolean
          min_stock: number
          name: string
          ncm: string | null
          numeric_id: number
          promotion_end: string | null
          promotion_price: number | null
          promotion_start: string | null
          sale_price: number
          sku: string | null
          stock_quantity: number
          stock_unit: string
          updated_at: string
        }
        Insert: {
          barcode?: string | null
          category?: string | null
          company_id: string
          cost_price?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_prepared?: boolean
          is_promotion?: boolean
          min_stock?: number
          name: string
          ncm?: string | null
          numeric_id?: number
          promotion_end?: string | null
          promotion_price?: number | null
          promotion_start?: string | null
          sale_price?: number
          sku?: string | null
          stock_quantity?: number
          stock_unit?: string
          updated_at?: string
        }
        Update: {
          barcode?: string | null
          category?: string | null
          company_id?: string
          cost_price?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_prepared?: boolean
          is_promotion?: boolean
          min_stock?: number
          name?: string
          ncm?: string | null
          numeric_id?: number
          promotion_end?: string | null
          promotion_price?: number | null
          promotion_start?: string | null
          sale_price?: number
          sku?: string | null
          stock_quantity?: number
          stock_unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      refunds: {
        Row: {
          amount: number
          cash_session_id: string | null
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          reason: string
          refund_method: string
          sale_id: string
          type: string
        }
        Insert: {
          amount: number
          cash_session_id?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason: string
          refund_method: string
          sale_id: string
          type: string
        }
        Update: {
          amount?: number
          cash_session_id?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string
          refund_method?: string
          sale_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "refunds_cash_session_id_fkey"
            columns: ["cash_session_id"]
            isOneToOne: false
            referencedRelation: "cash_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refunds_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_items: {
        Row: {
          addons: Json
          discount_amount: number
          id: string
          notes: string | null
          product_id: string | null
          product_name: string
          quantity: number
          sale_id: string
          subtotal: number
          unit_price: number
        }
        Insert: {
          addons?: Json
          discount_amount?: number
          id?: string
          notes?: string | null
          product_id?: string | null
          product_name: string
          quantity: number
          sale_id: string
          subtotal: number
          unit_price: number
        }
        Update: {
          addons?: Json
          discount_amount?: number
          id?: string
          notes?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          sale_id?: string
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          cash_session_id: string | null
          change_amount: number
          company_id: string
          created_at: string
          customer_id: string | null
          discount_amount: number
          id: string
          notes: string | null
          payment_amount: number
          payment_method: string
          status: string
          subtotal: number
          total: number
        }
        Insert: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          cash_session_id?: string | null
          change_amount?: number
          company_id: string
          created_at?: string
          customer_id?: string | null
          discount_amount?: number
          id?: string
          notes?: string | null
          payment_amount?: number
          payment_method: string
          status?: string
          subtotal?: number
          total?: number
        }
        Update: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          cash_session_id?: string | null
          change_amount?: number
          company_id?: string
          created_at?: string
          customer_id?: string | null
          discount_amount?: number
          id?: string
          notes?: string | null
          payment_amount?: number
          payment_method?: string
          status?: string
          subtotal?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_cash_session_id_fkey"
            columns: ["cash_session_id"]
            isOneToOne: false
            referencedRelation: "cash_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_members: {
        Row: {
          active: boolean
          badge_code: string
          company_id: string
          created_at: string
          id: string
          name: string
          pin_hash: string
          role: Database["public"]["Enums"]["company_role"]
        }
        Insert: {
          active?: boolean
          badge_code: string
          company_id: string
          created_at?: string
          id?: string
          name: string
          pin_hash: string
          role?: Database["public"]["Enums"]["company_role"]
        }
        Update: {
          active?: boolean
          badge_code?: string
          company_id?: string
          created_at?: string
          id?: string
          name?: string
          pin_hash?: string
          role?: Database["public"]["Enums"]["company_role"]
        }
        Relationships: [
          {
            foreignKeyName: "staff_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_movements: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          kind: string
          notes: string | null
          product_id: string
          quantity: number
          reference: string | null
          supplier_id: string | null
          unit_cost: number | null
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          kind: string
          notes?: string | null
          product_id: string
          quantity: number
          reference?: string | null
          supplier_id?: string | null
          unit_cost?: number | null
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          notes?: string | null
          product_id?: string
          quantity?: number
          reference?: string | null
          supplier_id?: string | null
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          company_id: string
          contact_name: string | null
          created_at: string
          document: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          contact_name?: string | null
          created_at?: string
          document?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          contact_name?: string | null
          created_at?: string
          document?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      support_messages: {
        Row: {
          author_id: string | null
          author_name: string | null
          author_type: string
          body: string
          created_at: string
          id: string
          metadata: Json | null
          ticket_id: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          author_type?: string
          body: string
          created_at?: string
          id?: string
          metadata?: Json | null
          ticket_id: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          author_type?: string
          body?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          company_id: string
          created_at: string
          first_response_at: string | null
          id: string
          priority: string
          resolved_at: string | null
          seq_number: number | null
          status: string
          subject: string
          updated_at: string
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string
          company_id: string
          created_at?: string
          first_response_at?: string | null
          id?: string
          priority?: string
          resolved_at?: string | null
          seq_number?: number | null
          status?: string
          subject: string
          updated_at?: string
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string
          company_id?: string
          created_at?: string
          first_response_at?: string | null
          id?: string
          priority?: string
          resolved_at?: string | null
          seq_number?: number | null
          status?: string
          subject?: string
          updated_at?: string
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_stale_cart_reservations: { Args: never; Returns: undefined }
      create_company_for_user: {
        Args: { p_business_type: string; p_document?: string; p_name: string }
        Returns: {
          address: string | null
          business_type: Database["public"]["Enums"]["business_type"]
          created_at: string
          created_by: string
          crediario_late_fee_percent: number
          crediario_late_fee_period: string
          document: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          payment_settings: Json | null
          phone: string | null
          printer_settings: Json | null
          settings: Json
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "companies"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      create_staff_member: {
        Args: {
          _badge_code: string
          _company_id: string
          _name: string
          _pin: string
          _role: Database["public"]["Enums"]["company_role"]
        }
        Returns: string
      }
      has_company_role: {
        Args: {
          _company_id: string
          _role: Database["public"]["Enums"]["company_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_company_member: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      log_audit_event: {
        Args: {
          _action: string
          _company_id: string
          _description?: string
          _entity_id?: string
          _entity_type?: string
          _metadata?: Json
          _staff_id?: string
          _staff_name?: string
        }
        Returns: string
      }
      update_staff_member: {
        Args: {
          _active: boolean
          _badge_code: string
          _id: string
          _name: string
          _pin?: string
          _role: Database["public"]["Enums"]["company_role"]
        }
        Returns: undefined
      }
      verify_staff_pin: {
        Args: { _badge_code: string; _company_id: string; _pin: string }
        Returns: {
          id: string
          name: string
          role: Database["public"]["Enums"]["company_role"]
        }[]
      }
    }
    Enums: {
      business_type:
        | "restaurant"
        | "snack_bar"
        | "market"
        | "distributor"
        | "delivery"
        | "retail"
        | "other"
      company_role: "owner" | "manager" | "cashier" | "waiter" | "kitchen"
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
    Enums: {
      business_type: [
        "restaurant",
        "snack_bar",
        "market",
        "distributor",
        "delivery",
        "retail",
        "other",
      ],
      company_role: ["owner", "manager", "cashier", "waiter", "kitchen"],
    },
  },
} as const
