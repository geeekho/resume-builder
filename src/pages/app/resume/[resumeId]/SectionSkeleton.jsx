import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SectionSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-[300px] w-full border-t-[20px] border-ring p-14 shadow-lg" />
    </div>
  );
};

export default SectionSkeleton;
