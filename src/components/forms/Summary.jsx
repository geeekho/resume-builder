import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Brain } from "lucide-react";

const Summary = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = { ...resumeInfo?.content, [name]: value };
    setResumeInfo({ ...resumeInfo, content: newValue });
  };

  const handleGenerateSummary = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Summary</h2>
      <span className="capitalize">add a brief summary .</span>
      <div className="mt-7">
        <div className="flex items-end justify-between">
          <label htmlFor="summary">Add Summary</label>
          <Button
            onClick={handleGenerateSummary}
            variant="outline"
            className="flex gap-2 border-primary text-primary transition-all hover:scale-105 hover:text-primary"
            size="sm"
          >
            <Brain className="h-4 w-4" />
            Generate From AI
          </Button>
        </div>
        <Textarea
          required
          className="mt-5"
          rows="7"
          name="summary"
          id="summary"
          defaultValue={resumeInfo?.content.summary ?? ""}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default Summary;
