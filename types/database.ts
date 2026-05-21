/**
 * Database types — manually defined for MVP foundation, will be
 * regenerated from the live Supabase schema in Sprint 6 via:
 *
 *   npx supabase gen types typescript --project-id <id> > types/database.ts
 *
 * Keep the shape stable so consumers (lib/supabase/*) compile until
 * the real schema is applied.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
