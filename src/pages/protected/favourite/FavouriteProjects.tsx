import ProjectComponent from "@/components/projects/ProjectComponent";
import Loading from "@/lib/Loading";
import { getProjectsByUserIdQuery } from "@/query/projects/projects";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const FavouriteProjects = () => {
  const { isLoading, error, data } = useQuery(getProjectsByUserIdQuery());

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message || "Something went wrong. Please try later");
    }
  }, [error?.message]);

  if (isLoading) {
    return <Loading hScreen />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const projects = data?.filter((p) => p.favourite) ?? [];

  return <ProjectComponent projects={projects} />;
};

export default FavouriteProjects;
