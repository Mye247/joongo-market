import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

const supabaseUrl = "https://frghixucjmwdoiizjraf.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LOCAL;

const supabase = createClient<Database>(supabaseUrl, supabaseKey!);

export default supabase;
