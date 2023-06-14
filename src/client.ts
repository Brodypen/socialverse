import { Database } from "./types/supabase";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  import.meta.env.VITE_URL as string,
  import.meta.env.VITE_API_KEY as string
);
