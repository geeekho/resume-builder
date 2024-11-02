import { memo, useMemo } from "react";
import { Input } from "../ui/input";

import { Rating, ThinStar } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const customStyles = {
  itemShapes: ThinStar,
  activeFillColor: "hsl(var(--primary))",
  inactiveFillColor: "hsl(var(--secondary-foreground))",
};

const SkillsFields = ({ index, skill, handleInputChange }) => {
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
    <div className="mb-2 flex w-full flex-row flex-wrap items-center justify-start rounded-lg border p-3">
      {/* skill name */}
      <div className="w-[min(300px,100%)]">
        <span className="text-xs capitalize">name</span>
        <Input
          required
          onChange={(e) => handleInputChange(e.target.value, "name", index)}
          value={skill?.name ?? ""}
        />
      </div>
      {/* rating */}
      <div className="mt-5 flex flex-1 items-center justify-end gap-2">
        <span className="text-xs capitalize">{skillName}</span>
        <Rating
          style={{ maxWidth: 120 }}
          value={skill?.rating / 10 / 2}
          onChange={(selectedValue) =>
            handleInputChange(selectedValue * 2 * 10, "rating", index)
          }
          itemStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default memo(SkillsFields);
