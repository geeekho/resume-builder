import { Loader2Icon, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const ResumeItemCard = ({ item, handleDeleteResume }) => {
  const navigation = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    await handleDeleteResume(item.id);
    setLoading(false);
  };

  return (
    <div>
      <Link to={`resume/${item.resume_id}/edit`}>
        <div
          className="flex h-[280px] cursor-pointer items-center justify-center rounded-t-lg border-t-4 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 p-14 shadow-primary transition-all hover:scale-105 hover:shadow-md"
          style={{
            borderColor: item?.content.themeColor,
          }}
        >
          <div className="flex h-[180px] items-center justify-center">
            {/* <FileUser /> */}
            <img src="/cv.png" width={80} height={80} alt="cv preview" />
          </div>
        </div>
      </Link>
      <div
        className="flex justify-between rounded-b-lg border p-3 shadow-lg"
        style={{
          background:
            !!item?.content.themeColor && item?.content.themeColor != ""
              ? item?.content.themeColor
              : "hsl(var(--secondary))",
        }}
      >
        <h2 className="text-sm">{item.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + item.resume_id + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation("/resume/" + item.resume_id + "/view")}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation("/resume/" + item.resume_id + "/view")}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeItemCard;
