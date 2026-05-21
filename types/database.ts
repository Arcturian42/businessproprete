/**
 * Database types — manually defined for MVP foundation.
 *
 * Once the Supabase project exists and migrations are applied,
 * regenerate via:
 *
 *   npx supabase gen types typescript \
 *     --project-id <id> > types/database.ts
 *
 * Until then, only the columns actually written by API routes
 * are typed (Insert / Update). Row types are loose — read code
 * narrows with explicit selectors.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Timestamp = string;
type Uuid = string;

export type LeadType =
  | 'tool_use'
  | 'pdf_download'
  | 'quote_request'
  | 'newsletter'
  | 'profile_claim'
  | 'demo_request'
  | 'contact';

export type LeadStatus =
  | 'new'
  | 'nurturing'
  | 'qualified'
  | 'sent_proprely'
  | 'sent_rp'
  | 'converted'
  | 'lost';

export type CompanyStatus = 'active' | 'pending' | 'suspended' | 'deleted';
export type CompanySize = '1-9' | '10-49' | '50-249' | '250+';
export type ClaimStatus = 'pending' | 'approved' | 'rejected';

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: Uuid;
          lead_type: LeadType;
          email: string;
          company_name: string | null;
          phone: string | null;
          company_size: CompanySize | null;
          message: string | null;
          source_page: string | null;
          score: number;
          status: LeadStatus;
          sent_to_proprely: boolean;
          sent_to_rp: boolean;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          user_agent: string | null;
          created_at: Timestamp;
        };
        Insert: {
          id?: Uuid;
          lead_type: LeadType;
          email: string;
          company_name?: string | null;
          phone?: string | null;
          company_size?: CompanySize | null;
          message?: string | null;
          source_page?: string | null;
          score?: number;
          status?: LeadStatus;
          sent_to_proprely?: boolean;
          sent_to_rp?: boolean;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          user_agent?: string | null;
          created_at?: Timestamp;
        };
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
        Relationships: [];
      };
      subscribers: {
        Row: {
          id: Uuid;
          email: string;
          first_name: string | null;
          company_name: string | null;
          company_size: CompanySize | null;
          source: string | null;
          tags: string[];
          is_active: boolean;
          unsubscribed_at: Timestamp | null;
          created_at: Timestamp;
        };
        Insert: {
          id?: Uuid;
          email: string;
          first_name?: string | null;
          company_name?: string | null;
          company_size?: CompanySize | null;
          source?: string | null;
          tags?: string[];
          is_active?: boolean;
          unsubscribed_at?: Timestamp | null;
          created_at?: Timestamp;
        };
        Update: Partial<Database['public']['Tables']['subscribers']['Insert']>;
        Relationships: [];
      };
      tool_results: {
        Row: {
          id: Uuid;
          tool_slug: string;
          inputs: Json;
          outputs: Json;
          session_id: string | null;
          lead_id: Uuid | null;
          source_page: string | null;
          user_agent: string | null;
          ip_hash: string | null;
          created_at: Timestamp;
        };
        Insert: {
          id?: Uuid;
          tool_slug: string;
          inputs: Json;
          outputs: Json;
          session_id?: string | null;
          lead_id?: Uuid | null;
          source_page?: string | null;
          user_agent?: string | null;
          ip_hash?: string | null;
          created_at?: Timestamp;
        };
        Update: Partial<Database['public']['Tables']['tool_results']['Insert']>;
        Relationships: [];
      };
      companies: {
        Row: {
          id: Uuid;
          name: string;
          slug: string;
          siret: string | null;
          siren: string | null;
          naf_code: string | null;
          naf_label: string | null;
          address: string | null;
          postal_code: string | null;
          city_id: Uuid | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          employee_count: number | null;
          revenue_range: string | null;
          description: string | null;
          specialties: string[];
          service_area: string[];
          lat: number | null;
          lng: number | null;
          score_visibility: number;
          is_verified: boolean;
          is_premium: boolean;
          status: CompanyStatus;
          enriched_data: Json;
          metadata: Json;
          created_at: Timestamp;
          updated_at: Timestamp;
          deleted_at: Timestamp | null;
        };
        Insert: Partial<Database['public']['Tables']['companies']['Row']> & {
          name: string;
          slug: string;
        };
        Update: Partial<Database['public']['Tables']['companies']['Row']>;
        Relationships: [];
      };
      cities: {
        Row: {
          id: Uuid;
          name: string;
          slug: string;
          slug_normalized: string;
          department_code: string;
          department_name: string;
          region: string;
          population: number | null;
          office_surface: number | null;
          cleaning_company_count: number | null;
          lat: number | null;
          lng: number | null;
          is_active: boolean;
          is_pilot: boolean;
          created_at: Timestamp;
          updated_at: Timestamp;
        };
        Insert: Partial<Database['public']['Tables']['cities']['Row']> & {
          name: string;
          slug: string;
          slug_normalized: string;
          department_code: string;
          department_name: string;
          region: string;
        };
        Update: Partial<Database['public']['Tables']['cities']['Row']>;
        Relationships: [];
      };
      company_claims: {
        Row: {
          id: Uuid;
          company_id: Uuid;
          claimant_name: string;
          claimant_email: string;
          claimant_phone: string | null;
          proof_document_url: string | null;
          status: ClaimStatus;
          admin_notes: string | null;
          created_at: Timestamp;
          processed_at: Timestamp | null;
        };
        Insert: {
          id?: Uuid;
          company_id: Uuid;
          claimant_name: string;
          claimant_email: string;
          claimant_phone?: string | null;
          proof_document_url?: string | null;
          status?: ClaimStatus;
          admin_notes?: string | null;
          created_at?: Timestamp;
          processed_at?: Timestamp | null;
        };
        Update: Partial<Database['public']['Tables']['company_claims']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
