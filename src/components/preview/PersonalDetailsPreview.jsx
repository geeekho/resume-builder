import dummy from "@/data/dummy";
import { memo } from "react";

const PersonalDetailsPreview = ({ resumeInfo, color }) => {
  return (
    <div>
      <h2
        className="text-bold text-center text-xl capitalize"
        style={{ color: color }}
      >
        {resumeInfo?.firstName && resumeInfo?.firstName.length > 0
          ? resumeInfo?.firstName
          : dummy.firstName}
        &nbsp;
        {resumeInfo?.lastName && resumeInfo?.lastName.length > 0
          ? resumeInfo?.lastName
          : dummy.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium capitalize">
        {resumeInfo?.jobTitle && resumeInfo?.jobTitle.length > 0
          ? resumeInfo?.jobTitle
          : dummy.jobTitle}
      </h2>
      <h2 className="text-center text-xs font-normal" style={{ color: color }}>
        {resumeInfo?.address}
      </h2>
      <div
        className="flex flex-wrap justify-between text-xs font-normal"
        style={{ color: color }}
      >
        <h2>
          {resumeInfo?.phone && resumeInfo?.phone.length > 0
            ? resumeInfo?.phone
            : dummy.phone}
        </h2>
        <h2>
          {resumeInfo?.email && resumeInfo?.email.length > 0
            ? resumeInfo?.email
            : dummy.email}
        </h2>
      </div>
      <hr className="my-2 border-[1.5px]" style={{ borderColor: color }} />
    </div>
  );
};

export default memo(PersonalDetailsPreview);
