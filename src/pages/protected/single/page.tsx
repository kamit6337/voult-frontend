import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getSecretsByProjectId } from "@/query/secrets/secrets";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateSecret from "../secrets/CreateSecret";
import { Separator } from "@/components/ui/separator";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";
import ProjectSecrets from "./ProjectSecrets";

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
              queryKey={["project", "secrets", projectId]}
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
