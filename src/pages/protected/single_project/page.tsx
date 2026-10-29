import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";
import ProjectSecrets from "./ProjectSecrets";
import CreateSecret from "@/components/secrets/CreateSecret";

const SinglePage = () => {
  const projectId = useSearchParams()[0].get("id");
  const [isOpen, setIsOpen] = useState(false);

  if (!projectId) {
    return <div>Something went wrong. Please try later</div>;
  }

  return (
    <section className="space-y-4">
      <div className="space-y-2 flex flex-col">
        <div className="self-end">
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button>Create Secret</Button>
            </AlertDialogTrigger>
            <CreateSecret
              onClose={() => setIsOpen(false)}
              projectId={projectId}
            />
          </AlertDialog>
        </div>
        <Separator />
      </div>
      <QuerySuspenseBoundary>
        <ProjectSecrets projectId={projectId} />
      </QuerySuspenseBoundary>
    </section>
  );
};

export default SinglePage;
