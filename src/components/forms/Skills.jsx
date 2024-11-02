import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import SkillsFields from "../custom/SkillsFields";
import { Button } from "../ui/button";

const formField = {
  name: "",
  rating: 0,
};

const Skills = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [skillsList, setSkillsList] = useState(
    resumeInfo?.content.skills ?? [formField],
  );

  const id = useId();

  useEffect(() => {
    const skills = resumeInfo?.content.skills ?? [formField];
    setSkillsList(skills);
  }, [resumeInfo]);

  const handleInputChange = useCallback(
    (value, name, index) => {
      const newEntriesList = skillsList.slice();
      newEntriesList[index][name] = value;
      console.log(newEntriesList[index]);

      const newValue = { ...resumeInfo?.content, skills: newEntriesList };
      setResumeInfo({ ...resumeInfo, content: newValue });
    },
    [skillsList, resumeInfo],
  );

  const handleAddNewSkill = () => {
    const newValue = {
      ...resumeInfo?.content,
      skills: [formField, ...skillsList],
    };

    setResumeInfo({ ...resumeInfo, content: newValue });
    document.getElementById("app-container").scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };
  const handleRemoveSkill = () => {
    if (skillsList.length === 1) return;
    const newValue = {
      ...resumeInfo?.content,
      skills: resumeInfo?.content.skills.slice(0, -1),
    };
    setResumeInfo({ ...resumeInfo, content: newValue });
  };

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Skills</h2>
      <span className="capitalize">add your top skills</span>

      <div>
        {skillsList.map((skill, index) => (
          <SkillsFields
            key={`${index}-skills}-${id}`}
            index={index}
            skill={skill}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>
      <div className="flex justify-start gap-2">
        <Button
          variant="outline"
          className="capitalize text-primary"
          onClick={handleAddNewSkill}
        >
          + add new skill
        </Button>
        <Button
          disabled={skillsList.length === 1}
          variant="outline"
          className="capitalize text-primary"
          onClick={handleRemoveSkill}
        >
          - remove skill
        </Button>
      </div>
    </>
  );
};

export default memo(Skills);
