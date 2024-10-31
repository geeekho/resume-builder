import { useState } from "react";
import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createResume } from "@/api/resume";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getToken } = useAuth();
  const { user } = useUser();
  const navigation = useNavigate();

  const toggleDialog = (value) => setOpenDialog(value);
  const onSubmit = async () => {
    if (!resumeTitle) return;
    try {
      setIsLoading(true);
      const token = await getToken({
        template: "supabase",
      });
      if (!!token) {
        const resumeObj = Object.assign(
          { title: resumeTitle },
          {
            email: user.primaryEmailAddress.emailAddress,
            username: user.fullName,
          },
        );
        const resume_id = await createResume(token, resumeObj);
        if (!!resume_id) {
          toggleDialog(false);
          navigation(`resume/${resume_id}/edit`);
        }
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={() => toggleDialog(true)}
        className="flex h-[280px] w-full cursor-pointer items-center justify-center rounded-lg border border-dashed bg-secondary p-14 py-24 text-foreground transition-all hover:scale-105 hover:border-solid hover:bg-primary/90 hover:text-white hover:shadow-md"
      >
        <PlusSquare />
      </button>

      <Dialog open={openDialog}>
        <DialogContent toggleModal={toggleDialog}>
          <DialogHeader>
            <DialogTitle className="capitalize">Create new resume</DialogTitle>
            <DialogDescription>
              <span>Give your resume a title</span>
              <Input
                className="my-2"
                placeholder="Ex. Frontend Javascript Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => toggleDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || isLoading} onClick={onSubmit}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
