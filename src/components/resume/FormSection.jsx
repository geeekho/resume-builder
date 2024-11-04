import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import PersonalDetails from "../forms/PersonalDetails";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import Summary from "../forms/Summary";
import ProfessionalExperience from "../forms/ProfessionalExperience";
import Education from "../forms/Education";
import Skills from "../forms/Skills";
import { Link } from "react-router-dom";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);

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

  return (
    <div className="relative h-full w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Link to="/dashboard">
            <Button>
              <Home />
            </Button>
          </Link>
          <Button variant="outline" className="flex gap-2" size="sm">
            <LayoutGrid /> Theme
          </Button>
        </div>

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
      </div>
    </div>
  );
};

export default FormSection;
