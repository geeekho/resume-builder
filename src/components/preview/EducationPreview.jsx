import { memo } from "react";

const EducationPreview = ({ resumeInfo, color }) => {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-center text-sm font-bold"
        style={{ color: color }}
      >
        Education
      </h2>
      <hr style={{ borderColor: color }} />

      {resumeInfo?.education &&
        resumeInfo?.education.map((education, index) => (
          <div key={index} className="my-5">
            <h2 className="text-sm font-bold" style={{ color: color }}>
              {education?.universityName}
            </h2>
            <h2 className="flex justify-between text-xs">
              {education?.degree} in {education.major}
              <span>
                {education?.startDate}&nbsp; - &nbsp;
                {education?.endDate}
              </span>
            </h2>
            <p className="my-2 text-xs">{education?.description}</p>
          </div>
        ))}
    </div>
  );
};

export default memo(EducationPreview);
