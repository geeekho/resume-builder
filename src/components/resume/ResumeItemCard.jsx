import { FileUser, Notebook } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeItemCard = ({ item }) => {
  return (
    <Link to={`resume/${item.resume_id}/edit`}>
      <div
        className="flex h-[280px] cursor-pointer items-center justify-center rounded-lg border-t-4 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 p-14 shadow-primary transition-all hover:scale-105 hover:shadow-md"
        style={{
          borderColor: item?.content.themeColor,
          // background: "linear-gradient(to top left,#84D9D0,#8D8BD9,#D9798B)",
        }}
      >
        <div className="flex h-[180px] items-center justify-center">
          {/* <FileUser /> */}
          <img src="/cv.png" width={80} height={80} alt="cv preview" />
        </div>
      </div>
      <h2 className="my-1 text-center capitalize">{item.title}</h2>
    </Link>
  );
};

export default ResumeItemCard;
