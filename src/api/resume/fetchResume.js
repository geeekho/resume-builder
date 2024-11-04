import { supabaseClient } from "@/utils";

export const fetchResumes = async (token) => {
  const supabase = supabaseClient(token);
  const { data, error } = await supabase.from("user_resume").select();
  if (!!error) {
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

export const fetchPublicResumeById = async (id) => {
  const supabase = supabaseClient("");

  const { data, error } = await supabase.rpc("get_user_resume_content", {
    p_resume_id: id,
  });
  if (!!error) throw new Error(error.message);
  return data;
};
