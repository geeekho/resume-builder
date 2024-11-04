import { MyProvider } from "@/context/ProfileContext";
import ResumeBuilder from "./ResumeBuilder";

const Edit = () => {
  return (
    <MyProvider>
      <ResumeBuilder />
    </MyProvider>
  );
};

export default Edit;
