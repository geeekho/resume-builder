import { memo } from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-center text-sm font-bold"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience.map((experience, index) => (
        <div key={index}>
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <h2 className="flex justify-between text-xs">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate}&nbsp; - &nbsp;
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>
          <div dangerouslySetInnerHTML={{ __html: experience.workSummary }} />
        </div>
      ))}
    </div>
  );
};

export default memo(ExperiencePreview);
