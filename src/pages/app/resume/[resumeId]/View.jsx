import { fetchPublicResumeById, fetchResumeById } from "@/api/resume";
import ResumePreview from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { ArrowDownToLine, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SectionSkeleton from "./SectionSkeleton";
import { useReactToPrint } from "react-to-print";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

const View = () => {
  const { resumeId } = useParams();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resumeInfo, setResumeinfo] = useState(null);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const getResume = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPublicResumeById(resumeId);
        setResumeinfo(data);
      } catch {
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };
    getResume();
  }, [resumeId]);

  return (
    <div className="mx-10 my-10 md:mx-20 lg:mx-36">
      {/* Headline */}
      <h2 className="text-center text-2xl font-medium capitalize">
        your resume is {isLoading ? "almost" : null} ready!{" "}
      </h2>
      <p className="text-center text-gray-400">
        {isLoading ? "you will be able to" : "Now you can"} download and share
        the resume {isLoading ? "in a moment" : null}
      </p>
      {/* Action buttons */}
      <div className="flex justify-around py-10">
        <Button disabled={isLoading} onClick={reactToPrintFn}>
          Save <ArrowDownToLine />
        </Button>
        <RWebShare
          data={{
            text: "I just created my resume using AI!",
            url:
              import.meta.env.VITE_BASE_URL + "/resume/" + resumeId + "/view",
            title: `${resumeInfo?.username}'s resume`,
          }}
        >
          <Button disabled={isLoading}>
            Share <Share2 />
          </Button>
        </RWebShare>
      </div>
      {/* container */}
      <div ref={contentRef}>
        {isLoading || !resumeInfo ? (
          <SectionSkeleton />
        ) : (
          <ResumePreview resumeInfo={resumeInfo} />
        )}
      </div>
    </div>
  );
};

export default View;
