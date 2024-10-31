import dummy from "@/data/dummy";
import { memo } from "react";

const PersonalDetailsPreview = ({ resumeInfo }) => {
  return (
    <div>
      <h2
        className="text-bold text-center text-xl capitalize"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName.length > 0
          ? resumeInfo?.firstName
          : dummy.firstName}
        &nbsp;
        {resumeInfo?.lastName.length > 0
          ? resumeInfo?.lastName
          : dummy.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium capitalize">
        {resumeInfo?.jobTitle.length > 0
          ? resumeInfo?.jobTitle
          : dummy.jobTitle}
      </h2>
      <h2
        className="text-center text-xs font-normal"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.address}
      </h2>
      <div
        className="flex justify-between text-xs font-normal"
        style={{ color: resumeInfo?.themeColor }}
      >
        <h2>
          {resumeInfo?.phone.length > 0 ? resumeInfo?.phone : dummy.phone}
        </h2>
        <h2>
          {resumeInfo?.email.length > 0 ? resumeInfo?.email : dummy.email}
        </h2>
      </div>
      <hr
        className="my-2 border-[1.5px]"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
};

export default memo(PersonalDetailsPreview);
