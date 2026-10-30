import { getReq } from "@/config/api";
import type { PROJECT } from "@/types/project";
import { queryOptions } from "@tanstack/react-query";

export const getProjectsByUserIdQuery = (toggle = true) =>
  queryOptions({
    queryKey: ["user", "projects"],
    queryFn: () => getReq<PROJECT[]>("/projects"),
    staleTime: Infinity,
    enabled: toggle,
  });
