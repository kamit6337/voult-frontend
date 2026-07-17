import { Separator } from "@/components/ui/separator";
import CreateProject from "../../../components/projects/CreateProject";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";
import Projects from "./Projects";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProjectsPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (bool: boolean) => {
    setOpen(bool);
  };

  return (
    <section className="space-y-2">
      <div className="space-y-2 flex flex-col">
        <div className="self-end">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button>Create Project</Button>
            </AlertDialogTrigger>
            <CreateProject handleOpen={handleOpen} />
          </AlertDialog>
        </div>
        <Separator />
      </div>

      <QuerySuspenseBoundary>
        <Projects />
      </QuerySuspenseBoundary>
    </section>
  );
};

export default ProjectsPage;
