import { createClient } from '@supabase/supabase-js';
console.log(import.meta.env.VITE_URL);
console.log(import.meta.env.VITE_API_KEY);
const URL= import.meta.env.VITE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


export const supabase = createClient(URL, API_KEY);
