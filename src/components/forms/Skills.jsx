import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";

const Skills = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Skills</h2>
      <span className="capitalize">get started with the basic information</span>
    </>
  );
};

export default Skills;
