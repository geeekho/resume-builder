import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useCallback, useContext, useEffect, useId, useState } from "react";
import EducationFields from "../custom/EducationFields";
import { Button } from "../ui/button";

const formField = {
  universityName: "",
  startDate: "",
  endDate: "",
  degree: "",
  major: "",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
};

const Education = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [educationList, setEducationList] = useState([]);

  const id = useId();

  useEffect(() => {
    const education = resumeInfo?.content.education ?? [formField];
    setEducationList(education);
  }, [resumeInfo]);

  const handleInputChange = useCallback(
    (e, index) => {
      const newEntriesList = educationList.slice();
      const { name, value } = e.target;

      newEntriesList[index][name] = value;
      const newValue = { ...resumeInfo?.content, education: newEntriesList };
      setResumeInfo({ ...resumeInfo, content: newValue });
    },
    [educationList, resumeInfo],
  );

  const handleAddNewExperience = () => {
    setEducationList([formField, ...educationList]);
    document.getElementById("app-container").scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };
  const handleRemoveExperience = () => {
    if (educationList.length === 1) return;
    const newValue = {
      ...resumeInfo?.content,
      education: resumeInfo?.content.education.slice(0, -1),
    };
    setResumeInfo({ ...resumeInfo, content: newValue });
  };

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Education</h2>
      <span className="capitalize">add your education details</span>
      <div>
        {educationList.map((education, index) => (
          <EducationFields
            key={`${index}-${resumeInfo?.firstName}-${id}`}
            index={index}
            education={education}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>
      <div className="flex justify-start gap-2">
        <Button
          variant="outline"
          className="capitalize text-primary"
          onClick={handleAddNewExperience}
        >
          + add education
        </Button>
        <Button
          disabled={educationList.length === 1}
          variant="outline"
          className="capitalize text-primary"
          onClick={handleRemoveExperience}
        >
          - remove education
        </Button>
      </div>
    </>
  );
};

export default Education;
