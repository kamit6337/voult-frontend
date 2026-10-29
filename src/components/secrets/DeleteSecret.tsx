import useDelete from "@/hooks/mutation/secrets/useDeleteSecret";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import type { SECRET } from "@/types/secret";
import useDeleteSecret from "@/hooks/mutation/secrets/useDeleteSecret";

type Props = {
  onClose: () => void;
  secret: SECRET;
};

const DeleteSecret = ({ secret, onClose }: Props) => {
  const deleteSecret = useDeleteSecret();

  const handleSubmit = () => {
    deleteSecret.mutateAsync(secret).then(() => {
      onClose();
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>Delete Secret</AlertDialogTitle>
      <AlertDialogDescription>
        <div className="flex items-center gap-2 font-semibold">
          <p className="w-12 shrink-0">Name :</p>
          <p>{secret.name}</p>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <p className="w-12 shrink-0">Value :</p>
          <p>{secret.value}</p>
        </div>
        <p className="mt-5">Once deleted cannot be returned back. Be Careful</p>
      </AlertDialogDescription>
      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel type="button" onClick={() => onClose()}>
          Cancel
        </AlertDialogCancel>

        <Button
          type="submit"
          disabled={deleteSecret.isPending}
          variant={"destructive"}
          onClick={handleSubmit}
        >
          {deleteSecret.isPending ? "Deleting" : "Delete"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteSecret;
