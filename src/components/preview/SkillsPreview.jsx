import { memo } from "react";

const SkillsPreview = ({ resumeInfo, color }) => {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-center text-sm font-bold"
        style={{ color: color }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: color }} />

      <div className="my-4 grid grid-cols-2 gap-3">
        {resumeInfo?.skills &&
          resumeInfo?.skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <h2 className="text-xs">{skill.name}</h2>
              <div className="h-2 w-[120px] bg-gray-200">
                <div
                  className="h-2"
                  style={{
                    backgroundColor: color,
                    width: skill.rating + "%",
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(SkillsPreview);
