import { ArrowLeft, ArrowRight, LayoutGrid, Loader2 } from "lucide-react";
import PersonalDetails from "../forms/PersonalDetails";
import { Button } from "../ui/button";
import { useContext, useMemo, useState } from "react";
import Summary from "../forms/Summary";
import ProfessionalExperience from "../forms/ProfessionalExperience";
import Education from "../forms/Education";
import Skills from "../forms/Skills";
import { useAuth } from "@clerk/clerk-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { updateResume } from "@/api/resume";
import { toast } from "sonner";

const FormSection = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  const [activeFormIndex, setActiveFormIndex] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const { getToken } = useAuth();

  const changeIndex = (value) => {
    if (value <= 0 || value > 5) return;
    setActiveFormIndex(value);
  };
  const renderForm = useMemo(() => {
    let elm = <PersonalDetails />;
    switch (activeFormIndex) {
      case 1:
        elm = <PersonalDetails />;
        break;
      case 2:
        elm = <Summary />;
        break;
      case 3:
        elm = <ProfessionalExperience />;
        break;
      case 4:
        elm = <Education />;
        break;
      case 5:
        elm = <Skills />;
        break;
      default:
        break;
    }
    return elm;
  }, [activeFormIndex]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = await getToken({
        template: "supabase",
      });
      if (!!token) {
        await updateResume(token, resumeInfo);
        toast.success("Details Updated.", {});
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <Button variant="outline" className="flex gap-2" size="sm">
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              disabled={activeFormIndex === 1}
              className="flex gap-2"
              size="sm"
              onClick={() => changeIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={activeFormIndex === 5}
            className="flex gap-2"
            size="sm"
            onClick={() => changeIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
        {renderForm}
        <div className="mt-2 flex justify-end">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Updating...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
