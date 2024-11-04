import { memo, useCallback, useEffect, useId, useState } from "react";
import { Button } from "../ui/button";
import ExperienceFields from "../custom/ExperienceFields";
import { useMyContext } from "@/context/ProfileContext";
import { toast } from "sonner";

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
  const { state: resumeInfo, dispatch } = useMyContext();

  const [experienceList, setExperienceList] = useState([formField]);

  const id = useId();

  useEffect(() => {
    const experience = resumeInfo?.content.experience ?? [formField];
    setExperienceList(experience);
  }, [resumeInfo]);

  const handleInputChange = useCallback(
    (e, id) => {
      const { name, value } = e.target;
      console.log(value);

      dispatch({
        type: "UPDATE_EXPERIENCE",
        payload: { id, [name]: value },
      });
    },
    [dispatch],
  );

  const handleCheckboxChange = (name, value, id) => {
    dispatch({
      type: "UPDATE_EXPERIENCE",
      payload: {
        id,
        [name]: value,
        endDate: !value ? new Date().toISOString().split("T")[0] : "",
      },
    });
  };

  const handleRichTextChange = useCallback(
    (value, name, id) => {
      dispatch({
        type: "UPDATE_EXPERIENCE",
        payload: {
          id,
          [name]: value,
        },
      });
    },
    [dispatch],
  );

  const handleAddNewExperience = useCallback(() => {
    dispatch({
      type: "ADD_EXPERIENCE",
      experience: {
        id: experienceList.length + 1,
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        workSummary: "",
      },
    });
    document.getElementById("app-container").scrollTo({
      top: 100,
      behavior: "smooth",
    });
  }, [dispatch, experienceList.length]);
  const handleRemoveExperience = useCallback(
    (id) => {
      if (experienceList.length === 1) {
        toast.warning("The list must contain at least one item");
        return;
      }
      dispatch({
        type: "REMOVE_EXPERIENCE",
        payload: { id },
      });
    },
    [dispatch, experienceList.length],
  );

  const updateContent = useCallback(
    (result, id) => {
      dispatch({
        type: "UPDATE_EXPERIENCE",
        payload: {
          id,
          workSummary: result,
        },
      });
    },
    [dispatch],
  );

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Professional Experience</h2>
      <span className="capitalize">add your previous work experience</span>
      <div>
        {experienceList.map((experience) => (
          <ExperienceFields
            key={`${experience.id}-${resumeInfo?.firstName}-${id}`}
            experience={experience}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            updateContent={updateContent}
            handleRichTextChange={handleRichTextChange}
            handleRemoveExperience={handleRemoveExperience}
          />
        ))}
      </div>
      <div className="flex justify-start gap-2">
        <Button
          variant="outline"
          className="capitalize text-primary"
          onClick={handleAddNewExperience}
        >
          + add experience
        </Button>
      </div>
    </>
  );
};

export default memo(ProfessionalExperience);
