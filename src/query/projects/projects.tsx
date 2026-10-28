import { getReq } from "@/config/api";
import type { PROJECT } from "@/types/project";
import { queryOptions } from "@tanstack/react-query";

export const getSingleProjectQuery = (
  toggle: boolean,
  projectId: string | null,
) =>
  queryOptions({
    queryKey: ["single", "project", projectId],
    queryFn: () => getReq<PROJECT>("/projects/single", { id: projectId || "" }),
    staleTime: Infinity,
    enabled: toggle && !!projectId,
  });

export const getProjectsByUserIdQuery = (toggle = true) =>
  queryOptions({
    queryKey: ["user", "projects"],
    queryFn: () => getReq<PROJECT[]>("/projects"),
    staleTime: Infinity,
    enabled: toggle,
  });
