import { Spinner } from "@/components/ui/Spinner";
import { supabaseClient } from "@/utils";
import { useAuth } from "@clerk/clerk-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

export const SupabaseContext = createContext({
  supabase: undefined,
  loading: false,
  error: undefined,
});

export const SupabaseProvider = ({ children }) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [supabase, setSupabase] = useState<SupabaseClient>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchTokenAndInitializeClient = async () => {
      console.log("fetchTokenAndInitializeClient");

      try {
        const token = await getToken({ template: "supabase" });
        if (!token) {
          throw new Error("No token found");
        }
        const supabase = supabaseClient(token);
        setSupabase(supabase);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
    if (isLoaded && isSignedIn) fetchTokenAndInitializeClient();
  }, [isLoaded, isSignedIn, getToken]);

  return (
    <SupabaseContext.Provider value={{ supabase, loading, error }}>
      {loading ? (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
          <Spinner className={undefined} size={undefined} />
        </div>
      ) : (
        children
      )}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
