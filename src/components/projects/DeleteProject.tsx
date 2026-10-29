import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import useDeleteProject from "@/hooks/mutation/projects/useDeleteProject";

type Props = {
  projectId: string;
  name: string;
  onClose: () => void;
};

const DeleteProject = ({ projectId, name, onClose }: Props) => {
  const deleteProject = useDeleteProject();

  const handleSubmit = () => {
    deleteProject.mutateAsync({ _id: projectId }).then(() => {
      onClose();
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>Delete Project</AlertDialogTitle>
      <AlertDialogDescription>
        <div className="flex items-center gap-2 font-semibold">
          <p className="w-12 shrink-0">Name :</p>
          <p>{name}</p>
        </div>

        <p className="mt-5">Once deleted cannot be returned back. Be Careful</p>
      </AlertDialogDescription>
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
