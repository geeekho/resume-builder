import { memo, useCallback, useEffect, useId, useState } from "react";
import SkillsFields from "../custom/SkillsFields";
import { Button } from "../ui/button";
import { useMyContext } from "@/context/ProfileContext";

const formField = {
  name: "",
  rating: 0,
};

const Skills = () => {
  const { state: resumeInfo, dispatch } = useMyContext();

  const [skillsList, setSkillsList] = useState([formField]);

  const id = useId();

  useEffect(() => {
    const skills = resumeInfo?.content?.skills ?? [formField];
    setSkillsList(skills);
  }, [resumeInfo]);

  const handleInputChange = useCallback(
    (value, name, id) => {
      dispatch({
        type: "UPDATE_SKILL",
        payload: { id, [name]: value },
      });
    },
    [dispatch],
  );

  const handleAddNewSkill = () => {
    dispatch({
      type: "ADD_SKILL",
      skill: {
        id: skillsList.length + 1,
        name: "",
        rating: 0,
      },
    });
  };
  const handleRemoveSkill = useCallback(
    (id) => {
      dispatch({
        type: "REMOVE_SKILL",
        payload: { id },
      });
    },
    [dispatch],
  );

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Skills</h2>
      <span className="capitalize">add your top skills</span>

      <div className="flex flex-col flex-nowrap gap-y-3">
        {skillsList.map((skill) => (
          <SkillsFields
            key={`${skill.id}-skills}-${id}`}
            skill={skill}
            handleInputChange={handleInputChange}
            handleRemoveSkill={handleRemoveSkill}
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
      </div>
    </>
  );
};

export default memo(Skills);
