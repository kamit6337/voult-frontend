import { Separator } from "@/components/ui/separator";
import type { PROJECT } from "@/types/project";

import { Star, DotSquare, EllipsisVerticalIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

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
        <div className="basis-10" />
        <p className="flex-1">Name</p>
        <p className="basis-40 flex justify-center">CreatedAt</p>
        <p className="basis-40 flex justify-center">UpdatedAt</p>
        <p className="basis-40 flex justify-end">Options</p>
      </div>
      <Separator />

      {projects.map((item) => {
        return (
          <div key={item._id}>
            <Link to={`/projects?id=${item._id}`}>
              <div className="flex justify-between items-center text-sm">
                <div className="basis-10 flex justify-center">
                  <Star size={16} fill={item.favourite ? "yellow" : "black"} />
                </div>
                <p className="flex-1 truncate">{item.name}</p>
                <p className="basis-40 flex justify-center">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="basis-40 flex justify-center">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </p>
                <p className="basis-40 flex justify-end">
                  <EllipsisVerticalIcon />
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default ProjectComponent;
