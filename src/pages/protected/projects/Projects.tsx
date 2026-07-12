import ProjectComponent from "@/components/projects/ProjectComponent";
import { getProjectsByUserIdQuery } from "@/query/projects/getByUserId";
import { useSuspenseQuery } from "@tanstack/react-query";

const Projects = () => {
  const { data } = useSuspenseQuery(getProjectsByUserIdQuery());

  if (data.length === 0) {
    return <p>No Projects</p>;
  }

  return <ProjectComponent projects={data} isHeader={false} />;
};

export default Projects;
