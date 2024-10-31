import { supabaseClient } from "@/utils";

export const createResume = async (token, resumeObj) => {
  const supabase = supabaseClient(token);
  if (!resumeObj.title || resumeObj.title.length === 0) {
    throw new Error("Invalid resume title!");
  }
  if (!resumeObj.email || !resumeObj.username) {
    throw new Error("Invalid user data!");
  }

  const { data, error } = await supabase
    .from("user_resume")
    .insert(resumeObj)
    .select("resume_id")
    .single();
  if (!!error) {
    console.log(error);
    throw new Error("Could not create resume.");
  }
  return data.resume_id;
};
