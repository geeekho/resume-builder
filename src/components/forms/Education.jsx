import { memo, useCallback, useEffect, useId, useState } from "react";
import EducationFields from "../custom/EducationFields";
import { Button } from "../ui/button";
import { useMyContext } from "@/context/ProfileContext";
import { toast } from "sonner";

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
  const { state: resumeInfo, dispatch } = useMyContext();

  const [educationList, setEducationList] = useState([formField]);

  const id = useId();

  useEffect(() => {
    const education = resumeInfo?.content.education ?? [formField];
    setEducationList(education);
  }, [resumeInfo]);

  const handleInputChange = useCallback(
    (e, id) => {
      const { name, value } = e.target;
      dispatch({
        type: "UPDATE_EDUCATION",
        payload: { id, [name]: value },
      });
    },
    [dispatch],
  );

  const handleAddNewEducation = useCallback(() => {
    dispatch({
      type: "ADD_EDUCATION",
      education: {
        id: educationList.length + 1,
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
        major: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      },
    });
    document.getElementById("app-container").scrollTo({
      top: 100,
      behavior: "smooth",
    });
  }, [dispatch, educationList.length]);

  const handleRemoveEducation = useCallback(
    (id) => {
      if (educationList.length === 1) {
        toast.warning("The list must contain at least one item");
        return;
      }
      dispatch({
        type: "REMOVE_EDUCATION",
        payload: { id },
      });
    },
    [dispatch, educationList.length],
  );

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Education</h2>
      <span className="capitalize">add your education details</span>
      <div>
        {educationList.map((education) => (
          <EducationFields
            key={`${education.id}-${resumeInfo?.firstName}-${id}`}
            education={education}
            handleInputChange={handleInputChange}
            handleRemoveEducation={handleRemoveEducation}
          />
        ))}
      </div>
      <div className="flex justify-start gap-2">
        <Button
          variant="outline"
          className="capitalize text-primary"
          onClick={handleAddNewEducation}
        >
          + add education
        </Button>
      </div>
    </>
  );
};

export default memo(Education);
