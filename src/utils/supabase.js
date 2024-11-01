import { createClient } from "@supabase/supabase-js";

const supabaseClient = (token) => {
  if (!import.meta.env.VITE_SUPABASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
  }
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    throw new Error("VITE_SUPABASE_ANON_KEY is not defined");
  }

  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );
};

export { supabaseClient };
