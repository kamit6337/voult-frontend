import { Separator } from "@/components/ui/separator";
import CreateProject from "./CreateProject";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";
import Projects from "./Projects";

const ProjectsPage = () => {
  return (
    <section className="space-y-2">
      <div className="space-y-2 flex flex-col">
        <div className="self-end">
          <CreateProject />
        </div>
        <Separator />
      </div>

      <QuerySuspenseBoundary>
        <Projects />
      </QuerySuspenseBoundary>
    </section>
  );
};

export default ProjectsPage;
