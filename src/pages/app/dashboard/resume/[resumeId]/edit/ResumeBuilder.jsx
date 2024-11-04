import { fetchResumeById } from "@/api/resume";
import FormSection from "@/components/resume/FormSection";
import ResumePreview from "@/components/resume/ResumePreview";
import { useMyContext } from "@/context/ProfileContext";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ResumeBuilder = () => {
  const { state, dispatch } = useMyContext();
  const { resumeId } = useParams();
  const { getToken } = useAuth();

  useEffect(() => {
    const getResume = async () => {
      dispatch({ type: "SET_LOADING", loading: true }); // Set loading to true
      const token = await getToken({
        template: "supabase",
      });
      if (token) {
        const data = await fetchResumeById(token, resumeId);
        dispatch({ type: "SET_RESUME", resume: data });
      }
    };
    getResume();
  }, [getToken, resumeId, dispatch]);

  return (
    <div className="relative">
      <div
        className={`grid transform grid-cols-1 gap-10 transition-all md:grid-cols-2 ${state.loading ? "blur-sm" : ""}`}
      >
        {/* Form Section */}
        <FormSection resumeInfo={state} />
        {/* Preview Section */}
        <ResumePreview resumeInfo={state} />
      </div>
      {state.loading ? (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-transparent" />
      ) : null}
    </div>
  );
};

export default ResumeBuilder;
