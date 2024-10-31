import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeItemCard = ({ item }) => {
  return (
    <Link to={`resume/${item.resume_id}/edit`}>
      <div className="flex h-[280px] cursor-pointer items-center justify-center rounded-lg border border-primary bg-secondary p-14 shadow-primary transition-all hover:scale-105 hover:shadow-md">
        <Notebook />
      </div>
      <h2 className="my-1 text-center capitalize">{item.title}</h2>
    </Link>
  );
};

export default ResumeItemCard;
