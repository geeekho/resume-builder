import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Brain } from "lucide-react";
import { chatSession } from "@/service/AIModel";
import { toast } from "sonner";
import { useMyContext } from "@/context/ProfileContext";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Entry level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

const Summary = () => {
  const { state: resumeInfo, dispatch } = useMyContext();

  const [AIGeneratedSummaryList, setAIGeneratedSummaryList] = useState([]);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_CONTENT_FIELD", data: { field: name, value } });
  };

  useEffect(() => {
    if (selectedSummaryIndex !== null && selectedSummaryIndex >= 0) {
      const summary =
        AIGeneratedSummaryList[selectedSummaryIndex].summary ?? "";
      dispatch({
        type: "UPDATE_CONTENT_FIELD",
        data: { field: "summary", value: summary },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSummaryIndex, AIGeneratedSummaryList]);

  const selectSummary = (index) => setSelectedSummaryIndex(index);

  const handleGenerateSummary = async (e) => {
    setIsGenerating(true);
    e.preventDefault();
    const PROMPT = prompt.replace(
      "{jobTitle}",
      resumeInfo?.content.jobTitle ?? "",
    );
    try {
      const result = await chatSession.sendMessage(PROMPT);
      if (!!result && !!result.response && result.response.text().length > 0) {
        console.log(result.response.text());

        setAIGeneratedSummaryList(JSON.parse(result.response.text()));
        setSelectedSummaryIndex(0);
      }
    } catch {
      toast.warning("something went wrong please try again");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Summary</h2>
      <span className="capitalize">add a brief summary .</span>
      <div className="mt-7">
        <div className="flex items-end justify-end">
          <Button
            onClick={handleGenerateSummary}
            variant="outline"
            className={`flex gap-2 border-primary text-primary hover:text-primary ${isGenerating ? "animate-pulse" : ""}`}
            size="sm"
          >
            <Brain className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate From AI"}
          </Button>
        </div>
        <Textarea
          required
          className="mt-5"
          rows="7"
          name="summary"
          id="summary"
          value={resumeInfo?.content.summary ?? ""}
          onChange={handleInputChange}
        />
      </div>
      {AIGeneratedSummaryList && AIGeneratedSummaryList.length > 0 && (
        <div className="my-5">
          <h2 className="text-lg font-bold">Suggestions</h2>
          {AIGeneratedSummaryList?.map((item, index) => (
            <button
              onClick={() => selectSummary(index)}
              key={index}
              className={`my-4 cursor-pointer rounded-lg p-5 text-left shadow-lg transition-all ${index === selectedSummaryIndex ? "border-2 border-primary" : "hover:scale-105 hover:border hover:border-primary"}`}
            >
              <h2 className="my-1 font-bold text-primary">
                Level: {item?.experience_level}
              </h2>
              <p className="line-clamp-2">{item?.summary}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Summary;
