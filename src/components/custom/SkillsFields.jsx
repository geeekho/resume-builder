import { memo, useId, useMemo } from "react";
import { Input } from "../ui/input";

import { Rating, ThinStar } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const customStyles = {
  itemShapes: ThinStar,
  activeFillColor: "hsl(var(--primary))",
  inactiveFillColor: "hsl(var(--input))",
};

const SkillsFields = ({ skill, handleInputChange, handleRemoveSkill }) => {
  const id = useId();

  const skillName = useMemo(() => {
    let value = "";
    switch (skill.rating / 10 / 2) {
      case 1:
        value = "Beginner";
        break;
      case 2:
        value = "Capable";
        break;
      case 3:
        value = "Intermediate";
        break;
      case 4:
        value = "Effective";
        break;
      case 5:
        value = "Experienced";
        break;
      default:
        break;
    }
    return value;
  }, [skill.rating]);

  return (
    <div
      key={id}
      className="relative mb-2 flex w-full flex-row flex-wrap items-center justify-start rounded-lg border p-3"
    >
      <Button
        className="absolute -right-4 -top-4 h-7 w-7 bg-destructive"
        onClick={() => handleRemoveSkill(skill.id)}
      >
        <Trash2 />
      </Button>
      {/* skill name */}
      <div className="w-[min(300px,100%)]">
        <label htmlFor={`name-${skill.id}`} className="text-xs capitalize">
          name
        </label>
        <Input
          id={`name-${skill.id}`}
          name="name"
          required
          onChange={(e) => handleInputChange(e.target.value, "name", skill.id)}
          defaultValue={skill?.name}
        />
      </div>
      {/* rating */}
      <div className="mt-5 flex flex-1 items-center justify-end gap-2">
        <span className="text-xs capitalize">{skillName}</span>
        <Rating
          style={{ maxWidth: 120 }}
          value={skill?.rating / 10 / 2}
          onChange={(selectedValue) =>
            handleInputChange(selectedValue * 2 * 10, "rating", skill.id)
          }
          itemStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default memo(SkillsFields);
