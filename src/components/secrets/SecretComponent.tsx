import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import type { SECRET, UPDATE_SECRET_FAVOURITE } from "@/types/secret";

import { Star, EllipsisVerticalIcon, CopyIcon, CheckIcon } from "lucide-react";
import CopyButton from "./CopyButton";
import { Link } from "react-router-dom";
import SecretValue from "./SecretValue";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import CreateSecret from "@/pages/protected/secrets/CreateSecret";
import { useEffect, useState } from "react";
import useUpdate from "@/hooks/mutation/useUpdate";
import { toast } from "sonner";
import DeleteSecret from "./DeleteSecret";

type Props = {
  secretsArr: SECRET[];
  isHeader?: boolean;
};

const SecretComponent = ({ secretsArr, isHeader = true }: Props) => {
  const [selectedSecret, setSelectedSecret] = useState<null | SECRET>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEditSelect = (secret: SECRET) => {
    setSelectedSecret(secret);
    setEditOpen(true);
  };

  const handleDeleteSelect = (secret: SECRET) => {
    setSelectedSecret(secret);
    setDeleteOpen(true);
  };

  const updateSecret = useUpdate<UPDATE_SECRET_FAVOURITE, SECRET>({
    mutationKey: ["update", "secret", "favourite"],
    queryKey: ["user", "secrets"],
    urlPath: "/secrets/favourite",
  });

  useEffect(() => {
    if (updateSecret.isSuccess) {
      toast.success("Secret Favourite Updated Successfully");
    }
  }, [updateSecret.isSuccess]);

  return (
    <main className="space-y-2">
      {isHeader && (
        <>
          <div className="flex justify-between items-center">
            <p className="px-2">Secrets</p>
            <Link to={"/secrets"}>
              <Button variant={"outline"}>View All</Button>
            </Link>
          </div>
          <Separator />
        </>
      )}

      {secretsArr.map((item, i) => {
        const nameCopiedId = `${item._id}-${item.name}`;
        const valueCopiedId = `${item._id}-${item.value}`;

        return (
          <div
            key={item._id}
            className="flex gap-2 justify-between items-center text-sm"
          >
            <p className="basis-6 grow-0 shrink-0 flex justify-center">
              {i + 1}
            </p>
            <div className="basis-10 grow-0 shrink-0 flex justify-center">
              <Star size={16} fill={item.favourite ? "yellow" : "black"} />
            </div>
            <div className="flex-1 flex justify-between items-center gap-3 border rounded-lg p-2">
              <p className="truncate flex">{item.name}</p>
              <CopyButton value={item.name} />
            </div>
            <div className="flex-1 flex justify-between items-center gap-3 border rounded-lg p-2">
              <SecretValue value={item.value} />
              <CopyButton value={item.value} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="">
                  <EllipsisVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-max whitespace-nowrap"
              >
                <DropdownMenuItem onSelect={() => handleEditSelect(item)}>
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    updateSecret.mutate({
                      _id: item._id,
                      favourite: !item.favourite,
                    })
                  }
                >
                  {item.favourite ? "Remove to Favourite" : "Add to Favourite"}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDeleteSelect(item)}>
                  Delete
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem className="text-xs flex flex-col items-start">
                  <p>CreatedAt</p>
                  <p className="self-center">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs flex flex-col items-start">
                  <p>UpdatedAt</p>
                  <p className="self-center">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}

      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        {selectedSecret && editOpen && (
          <CreateSecret
            key={selectedSecret._id}
            isUpdate={true}
            name={selectedSecret.name}
            value={selectedSecret.value}
            favourite={selectedSecret.favourite}
            secretId={selectedSecret._id}
            onClose={() => setEditOpen(false)}
          />
        )}
      </AlertDialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        {selectedSecret && deleteOpen && (
          <DeleteSecret
            key={selectedSecret._id}
            name={selectedSecret.name}
            value={selectedSecret.value}
            secretId={selectedSecret._id}
            onClose={() => setDeleteOpen(false)}
          />
        )}
      </AlertDialog>
    </main>
  );
};

export default SecretComponent;
