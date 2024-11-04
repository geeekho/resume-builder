import { supabaseClient } from "@/utils";

export const deleteResume = async (token, id) => {
  const supabase = supabaseClient(token);
  if (!id) {
    throw new Error("Invalid user data!");
  }
  console.log("deleting resume...");

  const { error } = await supabase.from("user_resume").delete().eq("id", id);

  if (!!error) {
    console.log(error);
    throw new Error("Could not delete resume.");
  }
};
