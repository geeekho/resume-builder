import { supabaseClient } from "@/utils";

export const updateResume = async (token, resumeObj) => {
  const supabase = supabaseClient(token);
  const { id, ...rest } = resumeObj;
  if (!id) {
    throw new Error("Invalid user data!");
  }
  console.log("updating resume...");

  const { error } = await supabase
    .from("user_resume")
    .update(rest)
    .eq("id", id);

  if (!!error) {
    console.log(error);
    throw new Error("Could not update resume.");
  }
};
