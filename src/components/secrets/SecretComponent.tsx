import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import type { SECRET } from "@/types/secret";
import { Star, EllipsisVerticalIcon, CopyIcon, CheckIcon } from "lucide-react";
import CopyButton from "./CopyButton";
import { Link } from "react-router-dom";
import SecretValue from "./SecretValue";
import { AlertDialog } from "../ui/alert-dialog";
import { useState } from "react";
import DeleteSecret from "./DeleteSecret";
import CreateSecret from "./CreateSecret";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByUserIdQuery } from "@/query/projects/projects";
import useUpdateSecretFavourite from "@/hooks/mutation/secrets/useUpdateSecretFavourite";
import { useOnInView } from "react-intersection-observer";
import Loading from "@/lib/Loading";

type Props = {
  secretsArr: SECRET[];
  isHeader?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const SecretComponent = ({
  secretsArr,
  isHeader = true,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: Props) => {
  const [selectedSecret, setSelectedSecret] = useState<null | SECRET>(null);
  const { data: userProjects } = useQuery(getProjectsByUserIdQuery());

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const inViewRef = useOnInView(
    (inView, entry) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    {
      threshold: 0.5,
      triggerOnce: true,
    },
  );

  const handleEditSelect = (secret: SECRET) => {
    setSelectedSecret(secret);
    setEditOpen(true);
  };

  const handleDeleteSelect = (secret: SECRET) => {
    setSelectedSecret(secret);
    setDeleteOpen(true);
  };

  const updateSecret = useUpdateSecretFavourite();

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

      {secretsArr.length === 0 && <div>No Secret yet.</div>}

      {secretsArr.length > 0 &&
        secretsArr.map((item, i) => {
          const nameCopiedId = `${item._id}-${item.name}`;
          const valueCopiedId = `${item._id}-${item.value}`;

          const project = userProjects?.find((i) => i._id === item.projectId);

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
                  {project && (
                    <>
                      <DropdownMenuItem className="flex flex-col items-start">
                        <p>Project :</p>
                        <p className="self-center">{project.name}</p>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Update Secret</DropdownMenuLabel>
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
                      {item.favourite
                        ? "Remove from Favourite"
                        : "Add to Favourite"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleDeleteSelect(item)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
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

      {isFetchingNextPage && <Loading hScreen={false} />}
      {hasNextPage && !isFetchingNextPage && <div ref={inViewRef} />}

      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        {selectedSecret && editOpen && (
          <CreateSecret
            isUpdate={true}
            onClose={() => setEditOpen(false)}
            secret={selectedSecret}
          />
        )}
      </AlertDialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        {selectedSecret && deleteOpen && (
          <DeleteSecret
            onClose={() => setDeleteOpen(false)}
            secret={selectedSecret}
          />
        )}
      </AlertDialog>
    </main>
  );
};

export default SecretComponent;
