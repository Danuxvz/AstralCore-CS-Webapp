import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://wfabluelnrmeetxfqbwa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYWJsdWVsbnJtZWV0eGZxYndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTgwMTEsImV4cCI6MjA3MTk3NDAxMX0.mDw7A9dFfw_B2glc2MYk-50U5NM41Dj5DuNB1NlYGbo"; 
export const supabase = createClient(supabaseUrl, supabaseKey);
