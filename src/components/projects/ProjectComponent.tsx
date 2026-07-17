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

type Props = {
  projects: PROJECT[];
  isHeader?: boolean;
};

const ProjectComponent = ({ projects, isHeader = true }: Props) => {
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
              <Link to={`/projects?id=${item._id}`} className="flex-1">
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
                  <DropdownMenuItem>Edit</DropdownMenuItem>

                  <DropdownMenuItem>
                    {item.favourite
                      ? "Remove to Favourite"
                      : "Add to Favourite"}
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default ProjectComponent;
