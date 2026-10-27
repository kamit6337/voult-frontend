import useDelete from "@/hooks/mutation/useDelete";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import type { DELETE_SECRET, SECRET } from "@/types/secret";

type Props = {
  secretId: string;
  name: string;
  value: string;
  onClose: () => void;
};

const DeleteSecret = ({ secretId, name, value, onClose }: Props) => {
  const deleteSecret = useDelete<DELETE_SECRET, SECRET>({
    mutationKey: ["delete", "secret"],
    queryKey: ["user", "secrets"],
    urlPath: "/secrets",
  });

  const handleSubmit = () => {
    deleteSecret.mutateAsync({ _id: secretId }).then(() => {
      onClose();
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>Delete Secret</AlertDialogTitle>
      <AlertDialogDescription>
        <div className="flex items-center gap-2 font-semibold">
          <p className="w-12 shrink-0">Name :</p>
          <p>{name}</p>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <p className="w-12 shrink-0">Value :</p>
          <p>{value}</p>
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
