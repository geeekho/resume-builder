import { useMemo } from "react";
import PersonalDetailsPreview from "../preview/PersonalDetailsPreview";
import SummaryPreview from "../preview/SummaryPreview";
import EducationPreview from "../preview/EducationPreview";
import SkillsPreview from "../preview/SkillsPreview";
import ExperiencePreview from "../preview/ExperiencePreview";

const ResumePreview = ({ resumeInfo }) => {
  const resume = useMemo(() => resumeInfo?.content, [resumeInfo]);
  const color = useMemo(() => {
    return !!resume.themeColor && resume.themeColor != ""
      ? resume.themeColor
      : "hsl(var(--default-resume))";
  }, [resume.themeColor]);

  return (
    <div
      className="h-full border-t-[20px] p-14 shadow-lg"
      style={{ borderColor: color }}
    >
      {/* Personal Details */}
      <PersonalDetailsPreview resumeInfo={resume} color={color} />

      {/* Summary */}
      <SummaryPreview resumeInfo={resume} />

      {/* Professional experience */}
      <ExperiencePreview resumeInfo={resume} color={color} />

      {/* Education */}
      <EducationPreview resumeInfo={resume} color={color} />
      {/* Skills */}
      <SkillsPreview resumeInfo={resume} color={color} />
    </div>
  );
};

export default ResumePreview;
