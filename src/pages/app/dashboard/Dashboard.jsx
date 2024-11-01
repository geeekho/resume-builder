import { useAuth } from "@clerk/clerk-react";
import AddResume from "../../../components/dashboard/AddResume";
import { fetchResumes } from "@/api/resume";
import { useEffect, useState } from "react";
import ResumeItemCard from "@/components/resume/ResumeItemCard";

const Dashboard = () => {
  const { getToken } = useAuth();

  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    const getResumeList = async () => {
      const token = await getToken({
        template: "supabase",
      });
      if (token) {
        const data = await fetchResumes(token);
        console.log(data);
        setResumeList(data ?? []);
      }
    };
    getResumeList();
  }, [getToken]);
  return (
    <div className="md:px-20 lg:px-32">
      <h2 className="text-3xl font-bold">My Resumes</h2>
      <span>start creating your AI resume to land your dream job!</span>
      <div className="mt-10 grid h-[280px] grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        <AddResume />
        {resumeList.map((resume) => (
          <div key={resume.id}>
            <ResumeItemCard item={resume} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
