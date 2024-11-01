import { memo, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { Brain } from "lucide-react";
import Editor from "./TextEditor/Editor";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const prompt =
  "position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array and no title) , the result with be in raw html, a ul HTML tag. and do not repeat your previous answer";

const ExperienceFields = ({
  index,
  experience,
  handleInputChange,
  handleCheckboxChange,
  updateContent,
  handleRichTextChange,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorData, setEditorData] = useState({
    isGenerated: false,
    text: experience?.workSummary ?? "",
  });

  useEffect(() => {
    setEditorData({ text: experience?.workSummary ?? "", isGenerated: false });
  }, [experience]);

  const handleGenerateSummary = async (title, index) => {
    if (!title || title === null || title === undefined || title.length === 0) {
      toast.warning("please provide a job title");
      return;
    }
    setIsGenerating(true);
    try {
      const PROMPT = prompt.replace("{positionTitle}", title ?? "");
      const result = await chatSession.sendMessage(PROMPT);

      if (!!result && !!result.response && result.response.text().length > 0) {
        updateContent(result.response.text(), index);
        setEditorData({
          isGenerated: true,
          text: JSON.parse(result.response.text()).experience,
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
      <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
        {/* title */}
        <div>
          <label htmlFor="title" className="text-xs capitalize">
            title
          </label>
          <Input
            required
            name="title"
            id="title"
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={experience.title}
          />
        </div>
        {/* company name */}
        <div>
          <label htmlFor="companyName" className="text-xs capitalize">
            company name
          </label>
          <Input
            required
            name="companyName"
            id="companyName"
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={experience.companyName}
          />
        </div>
        {/* city */}
        <div>
          <label htmlFor="city" className="text-xs capitalize">
            city
          </label>
          <Input
            required
            name="city"
            id="city"
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={experience.city}
          />
        </div>
        {/* state */}
        <div>
          <label htmlFor="state" className="text-xs capitalize">
            state
          </label>
          <Input
            required
            name="state"
            id="state"
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={experience.state}
          />
        </div>
        {/* start Date */}
        <div>
          <label htmlFor="startDate" className="text-xs capitalize">
            start Date
          </label>
          <Input
            required
            type="date"
            name="startDate"
            id="startDate"
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={experience.startDate}
          />
        </div>
        {/* end Date */}
        <div>
          <label htmlFor="endDate" className="text-xs capitalize">
            end Date
          </label>
          <Input
            disabled={experience?.currentlyWorking ?? false}
            required
            type="date"
            name="endDate"
            id="endDate"
            onChange={(e) => handleInputChange(e, index)}
            defaultValue={experience.endDate}
          />
        </div>
        <div className="col-span-2 flex items-center justify-end space-x-2">
          <Checkbox
            id="currentlyWorking"
            name="currentlyWorking"
            checked={experience?.currentlyWorking}
            onCheckedChange={(v) =>
              handleCheckboxChange("currentlyWorking", v, index)
            }
          />
          <label
            htmlFor="currentlyWorking"
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
                handleGenerateSummary(experience?.title ?? "", index)
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
            onChange={(v) => handleRichTextChange(v, "workSummary", index)}
            placeholder="Write your post here..."
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ExperienceFields);
