import { fetchResumeById } from "@/api/resume";
import FormSection from "@/components/resume/FormSection";
import ResumePreview from "@/components/resume/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { resumeId } = useParams();
  const { getToken } = useAuth();

  const [resumeInfo, setResumeInfo] = useState(null);
  useEffect(() => {
    const getResume = async () => {
      const token = await getToken({
        template: "supabase",
      });
      if (token) {
        const data = await fetchResumeById(token, resumeId);
        setResumeInfo(data);
      }
    };
    getResume();
  }, [getToken, resumeId]);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default Edit;
