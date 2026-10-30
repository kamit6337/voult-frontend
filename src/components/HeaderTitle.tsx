import { projects } from "@/data/projects";
import { getProjectsByUserIdQuery } from "@/query/projects/projects";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";

const HeaderTitle = () => {
  const { pathname } = useLocation();

  const projectId = useSearchParams()[0].get("id");

  const { data } = useQuery(getProjectsByUserIdQuery());

  if (pathname.startsWith("/single")) {
    const findProject = data?.find((p) => p._id === projectId);

    return (
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-400">Welcome,</p>
        <p className="text-lg">
          Project : {findProject?.name || "Wrong Project"}
        </p>
      </div>
    );
  }

  const currentPage = projects.find((item) =>
    item.url === "/"
      ? pathname === "/"
      : pathname === item.url || pathname.startsWith(`${item.url}/`),
  );

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-gray-400">Welcome,</p>
      <p className="text-lg">{currentPage?.title || "Wrong Route"}</p>
    </div>
  );
};

export default HeaderTitle;
