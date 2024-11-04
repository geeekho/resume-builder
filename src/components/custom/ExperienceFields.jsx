import { memo, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { Brain, Trash2 } from "lucide-react";
import Editor from "./TextEditor/Editor";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ExperienceFields = ({
  experience,
  handleInputChange,
  handleCheckboxChange,
  updateContent,
  handleRichTextChange,
  handleRemoveExperience,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorData, setEditorData] = useState({
    isGenerated: false,
    text: "",
  });

  useEffect(() => {
    setEditorData({ text: experience?.workSummary ?? "", isGenerated: false });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGenerateSummary = async (title, id) => {
    if (!title || title === null || title === undefined || title.length === 0) {
      toast.warning("please provide a job title");
      return;
    }
    setIsGenerating(true);
    try {
      const genPrompt =
        "position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume. No JSON object, just raw text. Please do not add experince level and No JSON array and no title , the result with be a simple ul HTML tag. and do not repeat your previous answer. Do not put the result in an object. Here is how the format of the text result should always be:  <ul><li>sample text.</li><li>sample text.</li></ul>";
      const PROMPT = genPrompt.replace("{positionTitle}", title ?? "");
      const result = await chatSession.sendMessage(PROMPT);

      if (!!result && !!result.response && result.response.text().length > 0) {
        updateContent(result.response.text(), id);
        setEditorData({
          isGenerated: true,
          text: result.response.text(),
        });
      }
    } catch (e) {
      console.log(e);
      toast.warning("something went wrong please try again");
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div>
      <div className="relative my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
        <Button
          variant="destructive"
          className="absolute -right-4 -top-4 h-7 w-7"
          onClick={() => handleRemoveExperience(experience.id)}
        >
          <Trash2 />
        </Button>
        {/* title */}
        <div>
          <label
            htmlFor={`title-${experience.id}`}
            className="text-xs capitalize"
          >
            title
          </label>
          <Input
            required
            name="title"
            id={`title-${experience.id}`}
            onChange={(e) => handleInputChange(e, experience.id)}
            defaultValue={experience?.title ?? ""}
          />
        </div>
        {/* company name */}
        <div>
          <label
            htmlFor={`companyName-${experience.id}`}
            className="text-xs capitalize"
          >
            company name
          </label>
          <Input
            required
            name="companyName"
            id={`companyName-${experience.id}`}
            onChange={(e) => handleInputChange(e, experience.id)}
            defaultValue={experience.companyName}
          />
        </div>
        {/* city */}
        <div>
          <label
            htmlFor={`city-${experience.id}`}
            className="text-xs capitalize"
          >
            city
          </label>
          <Input
            required
            name="city"
            id={`city-${experience.id}`}
            onChange={(e) => handleInputChange(e, experience.id)}
            defaultValue={experience.city}
          />
        </div>
        {/* state */}
        <div>
          <label
            htmlFor={`state-${experience.id}`}
            className="text-xs capitalize"
          >
            state
          </label>
          <Input
            required
            name="state"
            id={`state-${experience.id}`}
            onChange={(e) => handleInputChange(e, experience.id)}
            defaultValue={experience.state}
          />
        </div>
        {/* start Date */}
        <div>
          <label
            htmlFor={`startDate-${experience.id}`}
            className="text-xs capitalize"
          >
            start Date
          </label>
          <Input
            required
            type="date"
            name="startDate"
            id={`startDate-${experience.id}`}
            onChange={(e) => handleInputChange(e, experience.id)}
            defaultValue={experience.startDate}
          />
        </div>
        {/* end Date */}
        <div>
          <label
            htmlFor={`endDate-${experience.id}`}
            className="text-xs capitalize"
          >
            end Date
          </label>
          <Input
            disabled={experience?.currentlyWorking ?? false}
            required
            type="date"
            id={`endDate-${experience.id}`}
            name="endDate"
            onChange={(e) => handleInputChange(e, experience.id)}
            defaultValue={experience?.endDate ?? ""}
          />
        </div>
        <div className="col-span-2 flex items-center justify-end space-x-2">
          <Checkbox
            id={`currentlyWorking-${experience.id}`}
            name="currentlyWorking"
            checked={experience?.currentlyWorking}
            onCheckedChange={(v) =>
              handleCheckboxChange("currentlyWorking", v, experience.id)
            }
          />
          <label
            htmlFor={`currentlyWorking-${experience.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Currently working
          </label>
        </div>
        <Separator className="col-span-2 flex justify-end" />
        {/* work Summary */}
        <div className="col-span-2 h-full">
          <div className="my-2 flex justify-between">
            <span className="text-xs capitalize">summary</span>
            <Button
              onClick={() =>
                handleGenerateSummary(experience?.title ?? "", experience.id)
              }
              variant="outline"
              className={`flex gap-2 border-primary text-primary hover:text-primary ${isGenerating ? "animate-pulse" : ""}`}
              size="sm"
            >
              <Brain className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate From AI"}
            </Button>
          </div>
          <Editor
            content={editorData}
            onChange={(v) =>
              handleRichTextChange(v, "workSummary", experience.id)
            }
            placeholder="Write your post here..."
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ExperienceFields);
