import { Separator } from "@/components/ui/separator";
import type { PROJECT } from "@/types/project";

import { Star, DotSquare, EllipsisVerticalIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { AlertDialog } from "../ui/alert-dialog";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";

type Props = {
  projects: PROJECT[];
  isHeader?: boolean;
};

const ProjectComponent = ({ projects, isHeader = true }: Props) => {
  const [selectedProject, setSelectedProject] = useState<null | PROJECT>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEditSelect = (project: PROJECT) => {
    setSelectedProject(project);
    setEditOpen(true);
  };

  const handleDeleteSelect = (project: PROJECT) => {
    setSelectedProject(project);
    setDeleteOpen(true);
  };

  return (
    <main className="space-y-2">
      {isHeader && (
        <>
          <div className="flex justify-between items-center">
            <p className="px-2">Projects</p>
            <Link to={"/projects"}>
              <Button variant={"outline"}>View All</Button>
            </Link>
          </div>
          <Separator />
        </>
      )}
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="basis-16" />
        <p className="flex-1">Name</p>
        <p className="basis-40 flex justify-center">CreatedAt</p>
        <p className="basis-40 flex justify-center">UpdatedAt</p>
        <p className="basis-40 flex justify-end">Options</p>
      </div>
      <Separator />

      {projects.map((item, i) => {
        return (
          <div key={item._id}>
            <div className="flex justify-between items-center text-sm">
              <p className="basis-6 grow-0 shrink-0 flex justify-center">
                {i + 1}
              </p>
              <div className="basis-10 flex justify-center">
                <Star size={16} fill={item.favourite ? "yellow" : "black"} />
              </div>
              <Link to={`/single?id=${item._id}`} className="flex-1">
                <p className="line-clamp-1">{item.name}</p>
              </Link>
              <p className="basis-40 flex justify-center text-xs dark:text-gray-200">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="basis-40 flex justify-center text-xs dark:text-gray-200">
                {new Date(item.updatedAt).toLocaleDateString()}
              </p>
              <DropdownMenu>
                <div className="basis-40 flex justify-end">
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>
                      <EllipsisVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent
                  align="end"
                  className="w-max whitespace-nowrap"
                >
                  <DropdownMenuItem onSelect={() => handleEditSelect(item)}>
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                  // onClick={() =>
                  //   updateSecret.mutate({
                  //     _id: item._id,
                  //     favourite: !item.favourite,
                  //   })
                  // }
                  >
                    {item.favourite
                      ? "Remove to Favourite"
                      : "Add to Favourite"}
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
          </div>
        );
      })}

      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        {selectedProject && editOpen && (
          <CreateProject
            key={selectedProject._id}
            isUpdate={true}
            name={selectedProject.name}
            favourite={selectedProject.favourite}
            projectId={selectedProject._id}
            onClose={() => setEditOpen(false)}
          />
        )}
      </AlertDialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        {selectedProject && deleteOpen && (
          <DeleteProject
            key={selectedProject._id}
            name={selectedProject.name}
            projectId={selectedProject._id}
            onClose={() => setDeleteOpen(false)}
          />
        )}
      </AlertDialog>
    </main>
  );
};

export default ProjectComponent;
