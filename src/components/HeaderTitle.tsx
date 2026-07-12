import { projects } from "@/data/projects";
import { useLocation } from "react-router-dom";

const HeaderTitle = () => {
  const { pathname } = useLocation();

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
