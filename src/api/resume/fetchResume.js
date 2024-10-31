import { supabaseClient } from "@/utils";

export const fetchResumes = async (token) => {
  const supabase = supabaseClient(token);
  const { data, error } = await supabase.from("user_resume").select();
  if (!!error) {
    console.log(error);
    throw new Error("Could not fetch resume list.");
  }
  return data ?? [];
};
export const fetchResumeById = async (token, id) => {
  const supabase = supabaseClient(token);
  const { data, error } = await supabase
    .from("user_resume")
    .select()
    .eq("resume_id", id)
    .maybeSingle();

  if (!!error) {
    console.log(error);
    throw new Error("Could not fetch resume list.");
  }
  return data;
};
