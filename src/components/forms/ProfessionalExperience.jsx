import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";

const ProfessionalExperience = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Professional Experience</h2>
      <span className="capitalize">get started with the basic information</span>
    </>
  );
};

export default ProfessionalExperience;
