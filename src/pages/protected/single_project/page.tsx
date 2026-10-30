import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";
import ProjectSecrets from "./ProjectSecrets";
import CreateSecret from "@/components/secrets/CreateSecret";
import Metadata from "@/lib/Metadata";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByUserIdQuery } from "@/query/projects/projects";
import Loading from "@/lib/Loading";

const SingleProject = () => {
  const projectId = useSearchParams()[0].get("id");
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, error, data } = useQuery(getProjectsByUserIdQuery());

  if (!projectId) {
    return (
      <>
        <Metadata
          title="Voult | Project"
          description="Project secrets of Voult"
        />
        <div>Something went wrong. Please try later</div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Metadata
          title="Voult | Project"
          description="Project secrets of Voult"
        />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Metadata
          title="Voult | Project"
          description="Project secrets of Voult"
        />
        <p>{error.message}</p>
      </>
    );
  }

  const project = data?.find((p) => p._id === projectId);

  return (
    <>
      {project ? (
        <Metadata
          title={`Project | ${project.name}`}
          description="Project secrets of Voult"
        />
      ) : (
        <Metadata
          title="Voult | Project"
          description="Project secrets of Voult"
        />
      )}

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
    </>
  );
};

export default SingleProject;
