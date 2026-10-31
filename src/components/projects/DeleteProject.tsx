import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import useDeleteProject from "@/hooks/mutation/projects/useDeleteProject";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

type Props = {
  projectId: string;
  name: string;
  onClose: () => void;
};

const DeleteProject = ({ projectId, name, onClose }: Props) => {
  const deleteProject = useDeleteProject();
  const [checked, setChecked] = useState(false);

  const handleSubmit = () => {
    deleteProject
      .mutateAsync({ id: projectId, isDeleteSecretsAlso: checked })
      .then(() => {
        onClose();
      });
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>Delete Project</AlertDialogTitle>
      <div className="text-sm text-muted-foreground md:text-pretty space-y-5">
        <div className="flex items-center gap-2 font-semibold">
          <p className="w-12 shrink-0">Name :</p>
          <p>{name}</p>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={checked}
            onCheckedChange={(v: boolean) => setChecked(v)}
          />
          <p>Will Secrets be deleted also along with Project</p>
        </div>
        <p className="mt-5">Once deleted cannot be returned back. Be Careful</p>
      </div>
      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel type="button" onClick={() => onClose()}>
          Cancel
        </AlertDialogCancel>

        <Button
          type="submit"
          disabled={deleteProject.isPending}
          variant={"destructive"}
          onClick={handleSubmit}
        >
          {deleteProject.isPending ? "Deleting" : "Delete"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProject;
