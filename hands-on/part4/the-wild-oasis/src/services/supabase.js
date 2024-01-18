import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://juppcwcsykexnibuwutm.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cHBjd2NzeWtleG5pYnV3dXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzOTgyMzgsImV4cCI6MjAyMDk3NDIzOH0.9A8QB8VuwRAoxGp8ZPDL_5HjnM_-DDc9lCCRYVUUhVo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };
