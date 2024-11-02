import { memo } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const EducationFields = ({ index, education, handleInputChange }) => {
  return (
    <div>
      <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
        {/* university name */}
        <div className="col-span-2">
          <label
            className="text-xs capitalize"
            htmlFor={`universityName-${index}`}
          >
            university Name
          </label>
          <Input
            required
            name="universityName"
            id={`universityName-${index}`}
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={education?.universityName ?? ""}
          />
        </div>
        {/* degree */}
        <div>
          <label className="text-xs capitalize" htmlFor={`degree-${index}`}>
            degree
          </label>
          <Input
            required
            name="degree"
            id={`degree-${index}`}
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={education?.degree ?? ""}
          />
        </div>
        {/* major */}
        <div>
          <label className="text-xs capitalize" htmlFor={`major-${index}`}>
            major
          </label>
          <Input
            required
            name="major"
            id={`major-${index}`}
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={education?.major ?? ""}
          />
        </div>
        {/* start Date */}
        <div>
          <label htmlFor={`startDate-${index}`} className="text-xs capitalize">
            start Date
          </label>
          <Input
            required
            type="date"
            name="startDate"
            id={`startDate-${index}`}
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={education.startDate}
          />
        </div>
        {/* end Date */}
        <div>
          <label htmlFor={`endDate-${index}`} className="text-xs capitalize">
            end Date
          </label>
          <Input
            required
            type="date"
            name="endDate"
            id="endDate"
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={education.endDate}
          />
        </div>
        {/* description */}
        <div className="col-span-2">
          <label
            htmlFor={`description-${index}`}
            className="text-xs capitalize"
          >
            description
          </label>
          <Textarea
            required
            rows="7"
            name="description"
            id={`description-${index}`}
            defaultValue={education?.description ?? ""}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(EducationFields);
