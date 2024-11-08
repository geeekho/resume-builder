import { memo } from "react";

const ExperiencePreview = ({ resumeInfo, color }) => {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-center text-sm font-bold"
        style={{ color: color }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: color }} />

      {resumeInfo?.experience &&
        resumeInfo?.experience.map((experience, index) => (
          <div key={index}>
            <h2 className="text-sm font-bold" style={{ color: color }}>
              {experience?.title}
            </h2>
            <h2 className="flex justify-between text-xs">
              {experience?.companyName}, {experience?.city}, {experience?.state}
              <span>
                {experience?.startDate}&nbsp; - &nbsp;
                {experience?.currentlyWorking ? "Present" : experience?.endDate}
              </span>
            </h2>
            <div
              className="my-2 text-xs"
              dangerouslySetInnerHTML={{ __html: experience.workSummary }}
            />
          </div>
        ))}
    </div>
  );
};

export default memo(ExperiencePreview);
