import { memo } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const EducationFields = ({
  education,
  handleInputChange,
  handleRemoveEducation,
}) => {
  return (
    <div>
      <div className="relative my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
        <Button
          className="absolute -right-4 -top-4 h-7 w-7 bg-destructive"
          onClick={() => handleRemoveEducation(education.id)}
        >
          <Trash2 />
        </Button>
        {/* university name */}
        <div className="col-span-2">
          <label
            className="text-xs capitalize"
            htmlFor={`universityName-${education.id}`}
          >
            university Name
          </label>
          <Input
            required
            name="universityName"
            id={`universityName-${education.id}`}
            onChange={(e) => handleInputChange(e, education.id)}
            defaultValue={education?.universityName ?? ""}
          />
        </div>
        {/* degree */}
        <div>
          <label
            className="text-xs capitalize"
            htmlFor={`degree-${education.id}`}
          >
            degree
          </label>
          <Input
            required
            name="degree"
            id={`degree-${education.id}`}
            onChange={(e) => handleInputChange(e, education.id)}
            defaultValue={education?.degree ?? ""}
          />
        </div>
        {/* major */}
        <div>
          <label
            className="text-xs capitalize"
            htmlFor={`major-${education.id}`}
          >
            major
          </label>
          <Input
            required
            name="major"
            id={`major-${education.id}`}
            onChange={(e) => handleInputChange(e, education.id)}
            defaultValue={education?.major ?? ""}
          />
        </div>
        {/* start Date */}
        <div>
          <label
            htmlFor={`startDate-${education.id}`}
            className="text-xs capitalize"
          >
            start Date
          </label>
          <Input
            required
            type="date"
            name="startDate"
            id={`startDate-${education.id}`}
            onChange={(e) => handleInputChange(e, education.id)}
            defaultValue={education.startDate}
          />
        </div>
        {/* end Date */}
        <div>
          <label
            htmlFor={`endDate-${education.id}`}
            className="text-xs capitalize"
          >
            end Date
          </label>
          <Input
            required
            type="date"
            name="endDate"
            id={`endDate-${education.id}`}
            onChange={(e) => handleInputChange(e, education.id)}
            defaultValue={education.endDate}
          />
        </div>
        {/* description */}
        <div className="col-span-2">
          <label
            htmlFor={`description-${education.id}`}
            className="text-xs capitalize"
          >
            description
          </label>
          <Textarea
            required
            rows="7"
            name="description"
            id={`description-${education.id}`}
            defaultValue={education?.description ?? ""}
            onChange={(e) => handleInputChange(e, education.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(EducationFields);
