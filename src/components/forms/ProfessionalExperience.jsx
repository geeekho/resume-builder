import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { Button } from "../ui/button";
import ExperienceFields from "../custom/ExperienceFields";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: true,
  workSummary: "",
};

const ProfessionalExperience = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [experienceList, setExperienceList] = useState([formField]);

  const id = useId();

  useEffect(() => {
    const experience = resumeInfo?.content.experience ?? [formField];
    setExperienceList(experience);
  }, [resumeInfo]);

  const handleInputChange = useCallback(
    (e, index) => {
      const newEntriesList = experienceList.slice();
      const { name, value } = e.target;

      newEntriesList[index][name] = value;
      const newValue = { ...resumeInfo?.content, experience: newEntriesList };
      setResumeInfo({ ...resumeInfo, content: newValue });
    },
    [experienceList, resumeInfo],
  );

  const handleCheckboxChange = useCallback(
    (name, value, index) => {
      const newEntriesList = experienceList.slice();
      newEntriesList[index][name] = value;
      newEntriesList[index]["endDate"] = !value
        ? new Date().toISOString().split("T")[0]
        : "";

      const newValue = { ...resumeInfo?.content, experience: newEntriesList };
      setResumeInfo({ ...resumeInfo, content: newValue });
    },
    [experienceList, resumeInfo],
  );

  const handleRichTextChange = useCallback(
    (value, name, index) => {
      const newEntriesList = experienceList.slice();
      newEntriesList[index][name] = value;
      const newValue = { ...resumeInfo?.content, experience: newEntriesList };
      setResumeInfo({ ...resumeInfo, content: newValue });
    },
    [experienceList, resumeInfo],
  );

  const handleAddNewExperience = () => {
    setExperienceList([formField, ...experienceList]);
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };
  const handleRemoveExperience = () => {
    if (experienceList.length === 1) return;
    const newValue = {
      ...resumeInfo?.content,
      experience: resumeInfo?.content.experience.slice(0, -1),
    };
    setResumeInfo({ ...resumeInfo, content: newValue });
  };

  const updateContent = useCallback(
    (result, index) => {
      const newEntriesList = experienceList.slice();
      newEntriesList[index]["workSummary"] =
        JSON.parse(result).experience ?? "";
      const newValue = {
        ...resumeInfo?.content,
        experience: newEntriesList,
      };
      setResumeInfo({ ...resumeInfo, content: newValue });
    },
    [experienceList, resumeInfo],
  );

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Professional Experience</h2>
      <span className="capitalize">add your previous work experience</span>
      <div>
        {experienceList.map((experience, index) => (
          <ExperienceFields
            key={`${index}-${resumeInfo?.firstName}-${id}`}
            index={index}
            experience={experience}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            updateContent={updateContent}
            handleRichTextChange={handleRichTextChange}
          />
        ))}
      </div>
      <div className="flex justify-start gap-2">
        <Button
          variant="outline"
          className="capitalize text-primary"
          onClick={handleAddNewExperience}
        >
          + add more experience
        </Button>
        <Button
          disabled={experienceList.length === 1}
          variant="outline"
          className="capitalize text-primary"
          onClick={handleRemoveExperience}
        >
          - remove experience
        </Button>
      </div>
    </>
  );
};

export default memo(ProfessionalExperience);
