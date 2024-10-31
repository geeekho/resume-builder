import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useMemo } from "react";
import PersonalDetailsPreview from "../preview/PersonalDetailsPreview";
import SummaryPreview from "../preview/SummaryPreview";
import EducationPreview from "../preview/EducationPreview";
import SkillsPreview from "../preview/SkillsPreview";
import ExperiencePreview from "../preview/ExperiencePreview";

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  const resume = useMemo(() => resumeInfo?.content, [resumeInfo]);

  return (
    <div
      className="h-full border-t-[20px] p-14 shadow-lg"
      style={{ borderColor: resume?.themeColor }}
    >
      {/* Personal Details */}
      <PersonalDetailsPreview resumeInfo={resume} />

      {/* Summary */}
      <SummaryPreview resumeInfo={resume} />

      {/* Professional experience */}
      <ExperiencePreview resumeInfo={resume} />

      {/* Education */}
      <EducationPreview resumeInfo={resume} />
      {/* Skills */}
      <SkillsPreview resumeInfo={resume} />
    </div>
  );
};

export default ResumePreview;
