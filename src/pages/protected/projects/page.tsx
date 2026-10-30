import { Separator } from "@/components/ui/separator";
import CreateProject from "../../../components/projects/CreateProject";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";
import Projects from "./Projects";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Metadata from "@/lib/Metadata";

const ProjectsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Metadata title="Voult | Projects" description="Projects page of Voult" />
      <section className="space-y-2">
        <div className="space-y-2 flex flex-col">
          <div className="self-end">
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button>Create Project</Button>
              </AlertDialogTrigger>
              <CreateProject onClose={() => setOpen(false)} />
            </AlertDialog>
          </div>
          <Separator />
        </div>

        <QuerySuspenseBoundary>
          <Projects />
        </QuerySuspenseBoundary>
      </section>
    </>
  );
};

export default ProjectsPage;
